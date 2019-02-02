<?php
namespace app\admin\controller;
use think\Controller;

class Common extends Controller
{
    //渲染主视图
    public function  index(){
        
        //return $this->fetch();
        // get_defined_constants(true); tp自定义的常量
        return  "PublicAction_admin";
        exit;
        return $this->fetch();
        return $this->display();
    }

    public function info(){
        echo  "Common/info";
    }

}
