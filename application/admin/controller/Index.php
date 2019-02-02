<?php
namespace app\admin\controller;
use think\Session;
use think\Request;

class Index extends Base
{
    //渲染主视图
    public function index(){
        //echo "hello ".date('y-m-d h:i:s').'<br/>';
        return $this->fetch();
    }
    //渲染顶部视图
    public function head(){
        /* 跨模块调用  */
        //$event = \think\Loader::controller('app\admin\controller\Index');
        //$event = controller('app\admin\controller\Index');
        //$event->index();
        //action('app\admin\controller\Index\index', ['id' => 886688]); //直接调用并带参数 无返回值
        $a = get_defined_constants(true); //tp自定义的常量
        $uname = Session::get('user_name');
        $uname = $this->request->session('user_name');
        //$this->assign('day', $uname.'<br/>'.date("Y-m-d H:i:s"));
        $one_menu = db('menu_type')->where(array('fid'=>0) )->select();
        
        $this->assign('type', $one_menu);
        $this->assign('admin', $this->Admin);
        return $this->fetch();
    }
    //渲染左部视图
    public function left(){
        $this->set_menu();
        $this->assign('list', $this->list);
        
        return $this->fetch('left');
        return $this->display();
    }
    //渲染右部视图
    public function right(){
        
        
        return $this->fetch();
        return $this->display();
    }
    
    public function get_date_api(){
        $time_x = '';
        $val = [];
        for($i=0;   $i<=10;  $i++){
            $time_x .= $i .',';
            $val[$i] = array(rand(100,9999),rand(100,5000),rand(100,9000),rand(100,9999),rand(100,4000));
        }
        $val['axis_x'] = $time_x;
        echo json_encode($val);
        //数据格式 echo '{"39":["'.rand(100,9999).'","0","0","0","0","0","0","0","0","0","0","0","0"],"38":["0","0","0","0","0","0","0","0","0","0","0","0","0"],"axis_x":"39,38,"}';
    }
    
    public function set_menu(){
        $menu = db('menu_type')->alias('s')->field('s.id,s.name,s.css,p.url,p.quanxian,p.fid,p.id as pid, p.name as names')
        ->join('menu_type p','p.fid = s.id','LEFT')
        ->where(
             //'s.id','in',db('menu_type')->field('id')->where('fid',$id)->select(flase) //这种的返回字符串 但不能执行,需要字符串拼接
            's.id','in',function ($query){ $query->table('menu_type')->field('id')->where('fid',self::$typeid);}
        )->select();
        //echo db('menu_type')->getLastSql();
        
        $list =array();

        // 缺少对权限的检查
        foreach ($menu as $val){
           if (@!$list[$val['id']]){
               $list[$val['id']][] = ['id'=>$val['id'],'name'=>$val['name'],'css'=>$val['css'],'quanxian'=>$val['quanxian']];
           } 
           $list[$val['id']][] = $val;
        }
        
        $this->list = $list;
    }
    
    public function Login_index(){
        if(in_array(date('w'), [1,3,5])){$this->tmp = true; } 
        
        $a = get_defined_constants(true); //tp自定义的常量
        return $this->fetch('index');
    }


    public function hello($id){
        echo "hello1 ".date('y-m-d h:i:s');
    }
    public function hello1(){
        echo "hello2 ".date('y-m-d h:i:s');
    }
}
