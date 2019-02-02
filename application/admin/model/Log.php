<?php
namespace app\admin\model;

class Log extends Base{
    protected $table ="log";

    //查询多条
    public function get_all($where,$offset=0,$limit=10){
        //$list = $this->where($where)->field(['id','title'])->limit($offset,$limit)->order('id', 'desc')->select();
        return $this->where($where)->limit($offset,$limit)->order('id', 'desc')->select();
        //返回的是二维数组
    }
    
    
    
    
}