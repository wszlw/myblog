<?php
namespace app\admin\model;

use think\Model;

class Base extends Model
{
    //注意: think\Model中原生定义了很多私有化的成员变量,新变量要注意冲突
    //类外的静态访问成员方法/变量 不会创建对象也就不会走析构方法    
    
    //自定义初始化  重写父类的initialize()方法
    protected function initialize()
    {
        //需要调用`Model`的`initialize`方法
        parent::initialize();
        //TODO:自定义的初始化
        
        $this->_initialize_ext();
    }

    //初始化扩展
    public function _initialize_ext(){
        $this->_init_http_check();  //数据堡垒
        //echo "我是base Model";
    }
    
    //公共初始化 数据堡垒入口   数据监测
    public function _init_http_check(){
        $ishttp = Is_HttpType();
    }
    
    //json + token 返回
    public function die_json($status,$message,$is_token=false){
        die( Ajax_JsonMsg($status,$message,$is_token) );
    }
    
    // 当空方法时执行
    public function _empty($name){
        return 'empty work '.$name;dump($this->request->action());
    }
    
    //防止克隆
    private function __clone() {}
    
    //释放资源
    public function __destruct() {}
}

/** 小知识 
          初始化 的方法是 tp提供的不是原生php 易混淆
    tp5模型类的调用
    // 静态调用
    $Log = LogModel::hello(1);
    LogModel::$name123 = "cnm";
    LogModel::hehe();
    
    // 实例化模型
    $Log = new LogModel;
    $Log->hehehehe ='我是动态调用'; 
    $Log->hehe2();
    $Log->hehe();
    
    // 注下面的俩种不用use 文件,单上面的需要
    // 使用 Loader 类实例化（单例）这里返回的是静态的对象
    $Log = Loader::model('Log');
    $Log::$name123 = '我是静态变量789';
    $Log->name123 = '我是静态变量456';
    
    // 或者使用助手函数`model` 
    $Log = model('Log');
    $Log::$name123 = '我是静态变量1112';
    $Log->__toString();
    $Log->hello(99);
 */