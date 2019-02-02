<?php
namespace app\admin\controller;
use think\Controller;
use think\Session;
use think\Request;
use Code as Code; //引入/extend/Code.php 第三方类库

class UserCenter extends Controller
{
    private static $obj = NULL; //创建静态私有的变量保存该类对象
    public $request = '';       //session对象
    public $code = '';          //验证码
    public static $num='';  
    public $login = false;      //登录状态
    public $config=[            //用户字段配置
        'userField'=>[],
        'session'=>'user_admin',
        'login'=>'user_login',
    ];
    
    public $out= [];            //初始化base out全局变量 
    
    
    protected function _initialize(){ //防止直接创建对象
        $this->get_Requests();
        $this->checkLogin();
        $this->assign('out', array('title'=>'云日记'));
    }

    public static function get_session_id(){
        return session_id();
    }

    public function post(){
        var_dump($this->get_session('code'));
    }
    
    public static function getInstance(){
        //判断$obj是否是UserCenter的对象
        //没有则创建
        if (!self::$obj instanceof self) {
            self::$obj = new self();
        }
        return self::$obj;
    }
    
    //设置 Request对象
    public function get_Requests(){
        $this->request = Request::instance();
    }

    //更安全的 session 操作
    public function get_request($key){
        return $this->request->session($key);
    }
    
    public function del_session($key){
        return Session::delete($key);
    }
    
    //  session 操作
    public function get_session($key){
        return Session::get($key);
        //$uname = $this->request->session('user_name');
    }
    
    //设置session
    public function set_session($key,$val){
        Session::set($key,$val);
    }
    
    //是否登录
    public function checkLogin(){
        if(!empty($this->get_session($this->config['session']))){
            $this->login =true;
        }
    }
    
    //1.弱口令限制
    
    
    //2.验证码
    public function check_code(){

    }
    //2.验证码
    public function getImg(){
         $this->get_code_img();
    }

    
    public function get_code_img(){
        $code = new Code(80,30,4,5);
        $codes = "abcdefghijklmnopqrstuvwxyz0123456789";
        $codes = '0123456789';
        for ($i=0;$i<4;$i++){
            $this->code .= substr($codes,rand(0,strlen($codes)-1),1);
        }
        $code -> code = $this->code;
        $code -> getImage();
        Session::set('ImgCode',$this->code);
    }
    
    
    //get
    public function __get($name){
        if($this->$name!=NULL) return $this->$name; 
        return NULL;
    }
    
    //set
    public function __set($name,$val){
        
    }
    
    
    // 防止克隆
    private function __clone() {}
}