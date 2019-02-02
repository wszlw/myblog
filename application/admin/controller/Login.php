<?php
namespace app\admin\controller;
use think\Controller;
use think\db\Query;
use think\Loader;

class Login extends UserCenter
{
    //展示登录
    public function index(){
        $this->assign('logname','root');
        $this->assign('message','');
        return $this->fetch('public/login2');
    }
    
    //登录操作
    public function Login(){
        $admin = [];
        if (!$_POST || !$_POST['__token__']) return $this->index();
        
        //回传参数
        $this->assign('logname',$_POST['logname']);
        
        $validate = Loader::validate('Common','validate',false,'');
        if(!$validate->check($_POST)){
            $this->assign('message',$validate->getError());
            return $this->fetch('public/login2');
        }
    
        //验证码验证
        if(@$_POST['code']){
            if ($this->get_session('ImgCode')!=trim($_POST['code'])){
                $this->assign('message',$this->Get_error_message('code'));
                return $this->fetch('public/login2');
            }
        }

        //是否是冻结用户
        $sql = "SELECT * FROM `login_err` WHERE `name` = '{$_POST['logname']}' AND `status` IN (1,9) AND `totime` > ".time()." LIMIT 1";
        $admin_err = db('login_err')->query($sql);
        
        if($admin_err){
            $this->assign('message',$this->Get_error_message($admin_err[0]));
            return $this->fetch('public/login2');
        }
        
        $admin = db('admin')->field('*')->where(
            [ 'name'=>$_POST['logname'],'pwd'=>$_POST['logpass'],'status'=>1,'gid'=>['neq',1] ])->find();
        
        if (!$admin){
            $this->assign('message',$this->Get_error_message());
            return $this->fetch('public/login2');
        }else{
            //当 admin验证成功 如果问题是打开的 验证 问题
            if(isset($_POST['wenti']) && isset($_POST['daan'])){
                $admin_wt = db('admin_wenti')->field('*')->where(
                    [ 'adminid'=>$admin['id'],'wenti'=>$_POST['wenti'],'daan'=>$_POST['daan'],'status'=>1 ])->find();
                if (!$admin_wt){
                    $this->assign('message','问题答案错误!');
                    return $this->fetch('public/login2');
                }
            }
        }
        $this->set_session($this->config['session'], $admin);
        $this->login_log($admin['id']);
        $this->redirect("Index/index");
        //$this->redirect("Index/Login_index",['useName'=>$_POST['logname']]);
    }

    //退出登录
    public function Login_out(){
        
    } 
    
    //登录日志
    public function login_log($aid){
        $date = ['aid'=>$aid,'ctime'=>time(),'ip'=>$this->Get_login_ip()];
        db('login_log')->insert($date);
    }
    //获取登录ip
    public function Get_login_ip() {
        //strcasecmp 比较两个字符，不区分大小写。返回0，>0，<0。
        //getenv 获取一个环境变量的值
        if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
            $ip = getenv('HTTP_CLIENT_IP');
        } elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
            $ip = getenv('HTTP_X_FORWARDED_FOR');
        } elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
            $ip = getenv('REMOTE_ADDR');
        } elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return preg_match ( '/[\d\.]{7,15}/', $ip, $matches ) ? $matches [0] : $ip;
    }
   
    //获取错误提示
    /**
     * $date = [] 冻结用户  | $date = 'code' 验证码错误 | $date = '' 常规错误  
     * @param string $date
     * @return string
     */
    public function Get_error_message($date=''){
        $mes =  '';
        if(is_array($date))
        {
            if($date['status']==9){ //永久冻结
                $mes =  '账户异常,无法进行登录!';
            } else{
                $mes =  '账户异常 至'.date("Y-m-d H:i:s",$date['ctime']).' 到 '.date("Y-m-d H:i:s",$date['totime'])."冻结!";
            }
        }
        else if($date=='code')
        {
            $this->assign('code','on');//打开验证码
            return $mes =  '请正确填写验证码!';
        }     
        else 
        {   
            $sessin_id = $this->get_session_id() ? $this->get_session_id() : md5($_POST['logname']);
            @$login_num = $this->get_session($this->config['login'])[$_POST['logname']] ? $this->get_session($this->config['login'])[$_POST['logname']] : 1 ;
            switch ($login_num)
            {
                case 1:
                    $this->assign('code','on');//打开验证码
                    $mes =  '用户名/密码错误,或管理员身份过期!';
                    break;
                case 2:
                    $mes = '第'.$login_num.'次 登录错误,剩余2次登录机会!请验证验证码';
                    $this->assign('code','on');//打开验证码
                    break;
                case 3:
                    $mes = '第'.$login_num.'次 登录错误,再次错误将暂时冻结账户';
                    $this->assign('wenti','on');//打开问题
                    $this->assign('code','on');//打开验证码
                    break;
                case 4:
                    $mes = '以错误登录'.$login_num.'次,'.$_POST['logname'].'账号风险值较高,限制当日登录,将在24小时后自动解除';
                    $date = ['name'=>$_POST['logname'],'ctime'=>time(),'totime'=>(3600*24+time()),'ip'=>$this->Get_login_ip()];
                    db('login_err')->insert($date); //记录封锁表
                    $this->del_session($sessin_id);
                    break;
                default:
                    $mes =  '登录程序异常,以预警管理员处理!';//后面加预警邮件或日志                    
            }
            $admin[$_POST['logname']] = $login_num + 1; //累积错误次数
            $this->set_session($this->config['login'], $admin);
        }    
        return $mes;
    }
}