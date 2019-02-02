<?php
namespace app\test\controller;
use think\Controller;
use think\Session;
use think\Request;
use think\Validate;//验证规则

class Base extends Controller
{
    public $base = '';
    public $request = '';
    public $module = '';
    public $controller = '';
    public $action = '';
    protected $getArr = []; //get数据
    
    
    public function _initialize(){
        //$this->_init_http_check();  //数据堡垒
        //重定向到admin模块的Common/index操作
        //$this->redirect('admin/Common/index', ['cate_id' => 2]);
        //$this->redirect('News/category', ['cate_id' => 2], 302, ['data' => 'hello']);
        
        if($this->request->controller() == "Base") exit('404 访问的方法不存在!');
        $this->_initialize_ext();   //初始化
        $this->_init_http_check();  //数据堡垒
    }

    //设置 Request对象 得到请求的数据url地址
    public function Get_Request(){
        $this->request = Request::instance();
    }
    
    //初始化扩展
    public function _initialize_ext(){
        
        $this->congfig = config('base_config');
        
        
        //Session::set('user_name',"张三");
        $this->Get_Request();
        $this->getArr = $this->request->param();
        
        $this->module = $this->request->module();//模块名
        $this->controller = $this->request->controller();//控制器名
        $this->action = $this->request->action();//方法名
        
        
        
        $this->out['cssid'] = !empty($this->getArr['cssid'])?$this->getArr['cssid']:0; //css变量id
        $this->out['action'] = $this->action;
        $this->out['title'] = '云日记';
        
        /*
        $pub_token = Session::get('pub_token');
        $new = md5(time());
        if($pub_token){
            if(($pub_token['time']) < time()){
                $pub_token = $new;
            }else{
                $pub_token = $pub_token['token'];
            }
        }else {
            $pub_token = $new;
            Session::set('pub_token', ['time'=>(time()+3000),'token'=>$pub_token]);
        }
        $this->out['pub_token'] = $pub_token;
        */
        $this->assign('out', $this->out);
        
    }
    
    
    //公共初始化 数据堡垒入口   数据监测
    public function _init_http_check(){
        /*
         //验证的一种 input tp5封装的函数可以自动获取多形式提交的 这个 键值__token__的数据  注 直接获取原数据 列post程序修改无效
         //$bool = Validate::token('__token__','',['__token__'=>input('param.__token__')]);
         //token 验证前俩个参数可以为空 后面的数组格式包含键 __token__即可
         //$bool = Validate::token('__token__','',$_POST);
         */
        $token_name = '__token__'; 
        $ishttp = Is_HttpType();
        
        if ( 1== $ishttp || $ishttp ==3 ){
            //@$token = input('param.'.$token_name) ? input('param.'.$token_name) : $_REQUEST[$token_name];
            @$token = input('param.'.$token_name) ? input('param.'.$token_name) : Session::get($token_name);
            //post || ajax 都要验证 token 表单必须得带
            var_dump($_POST);var_dump($token);var_dump(Session::get($token_name));var_dump($_SESSION);
            if(!Validate::token($token_name,'',[$token_name=>$token])){
                header('HTTP/1.1 404 Not Found');//die("I CanNot KNow Token!");
                die($this->die_json(999, 'Token Expired!'));
            }
        }
    }

    //json + token 返回
    public function die_json($status,$message,$is_token=false){
        return ( Ajax_JsonMsg($status,$message,$is_token) );
    }
    
    // 当空方法时执行
    public function _empty($name)
    {
        switch ($this->action){
            case 'content':
                if(!$this->getArr['id']){  return 'empty id'; break;}
                $this->redirect('index/Index/log_content', ['id' => $this->getArr['id']]);
                break;
            default:
                return 'empty work '.$name;dump($this->request->action());
        }
    }
    
    //防止克隆
    private function __clone() {}
    
    //释放资源
    public function __destruct() {}

}