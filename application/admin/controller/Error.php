<?php
namespace app\admin\controller;
use think\Request;

//当访问方法不存在时执行
class Error extends Base
{
    public function index()
    {
        //根据当前控制器名来判断要执行那个城市的操作
        $cityName = $this->request->controller();
        return $this->city($cityName);
    }

    //注意 city方法 本身是 protected 方法
    protected function city($name)
    {
        var_dump($this->congfig);
        //和$name这个城市相关的处理
        return '当前是空的控制器' . $name;
    }
}