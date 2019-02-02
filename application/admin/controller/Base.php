<?php
namespace app\admin\controller;
use think\Controller;
use think\Session;
use think\Request;//数据类
use think\Loader;//加载类
use think\Validate;//验证规则
use app\admin\controller\UserCenter as UserCenter; //等于 require_once '/UserCenter.php';


class Base extends Controller
{
    protected $request = ''; //session对象
    protected $list = '';  //菜单列表
    protected static $typeid = 1; //分类id
    protected $getArr = []; //get数据
    protected $congfig = []; //自定义配置  
    protected $out = []; //模板的共享base变量 
    protected $Admin=[]; //管理员数据字段
    protected $validate=NULL;//实例化公共验证器
    
    /*public function __construct(){
     //应该是你把父类的__construct函数覆盖了，初始化可以写在_initialize函数里，不用写在__construct里
     parent::__construct();  //我们在使用了__construct构造函数，覆盖了父类的构造函数，导致父类tp的方法无法使用，例如$this->display()
     echo   "construct";
     }*/
    
    public function _initialize(){
        if($this->request->controller() == "Base") exit('404 访问的方法不存在!');
        $this->_initialize_ext();   //初始化
        $this->_init_http_check();  //数据堡垒
        //重定向到admin模块的Common/index操作
        //$this->redirect('admin/Common/index', ['cate_id' => 2]);
        //$this->redirect('News/category', ['cate_id' => 2], 302, ['data' => 'hello']);
    }

    //设置 Request对象
    public function Get_Request(){
        $this->request = Request::instance();
    }
    
    //初始化扩展
    public function _initialize_ext(){
        //Session::set('user_name',"张三");
        $this->Get_Request();
        if ($this->request->param('typeid')){
            self::$typeid = $this->request->param('typeid');
        }
        $this->getArr = $this->request->param();
        $this->congfig = config('base_config');
        $this->out['cssid'] = !empty($this->getArr['cssid'])?$this->getArr['cssid']:0; //css变量id
        $this->out['action'] = $this->request->action();
        $this->out['title'] = '云日记';
        //if(in_array(date('w'), [1,3,5])){$this->tmp = true; }
        
        //实例化公共验证器
        $this->validate = Loader::validate('Common','validate',false,'');
        
        //验证登录并实列化 用户中心类
        $USER = UserCenter::getInstance();
        
        if(!$USER->login){
            $this->redirect("Login/index");
        }
        $this->Admin = $USER->get_session('user_admin');
        $this->out['admin'] = $this->Admin;
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
        $ishttp = Is_HttpType();
        
        if ( 1== $ishttp || $ishttp ==3 ){
            @$token = input('param.__token__') ? input('param.__token__') : $_REQUEST['__token__'];
            //post || ajax 都要验证 token 表单必须得带
            if(!Validate::token('__token__','',['__token__'=>$token])){
                header('HTTP/1.1 404 Not Found');//die("I CanNot KNow Token!");
                die($this->die_json(999, 'Token Expired!'));
            }
        }
    }
    
    //json + token 返回
    public function die_json($status,$message,$is_token=false){
        die( Ajax_JsonMsg($status,$message,$is_token) );
    }
    
    public function set_function(){
        $url = $_SERVER["REQUEST_URI"] ? $_SERVER["REQUEST_URI"] :
        ($_SERVER["SCRIPT_NAME"] ? $_SERVER["SCRIPT_NAME"] : ($_SERVER["PATH_INFO"]? $_SERVER["PATH_INFO"] : $_SERVER["PHP_SELF"]));
        $url = explode('/', $url);
        
        dump($this->request->controller()); //当前控制器
        dump($this->request->module());     //当前模块
        dump($this->request->action());     //当前方法
        return $url[count($url)-1];
    } 
    
    
    // 当空方法时执行
    public function _empty($name)
    {
        return 'empty work '.$name;dump($this->request->action());
    }
    
    //防止克隆
    private function __clone() {}
    
    //释放资源
    public function __destruct() {}
    
     
    
    
    /*public function index()
     {
        echo json_encode($this->getArr);exit;
        $limt ="<br/>";
        echo "url=> ".$_SERVER["REQUEST_URI"].$limt
        ."name=> ".$_SERVER["SCRIPT_NAME"].$limt.
        "PATH_INFO=> ".$_SERVER["PATH_INFO"].$limt.
        "PATH_TRANSLATED=> ".$_SERVER["PATH_TRANSLATED"].$limt.
        "PHP_SELF=> ".$_SERVER["PHP_SELF"];
     }*/

}