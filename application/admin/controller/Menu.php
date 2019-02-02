<?php
namespace app\admin\controller;

class Menu extends Base
{
    public function index(){
        var_dump($_GET);
        var_dump($_POST);
    }
    
    public function add_menu_do(){
        $state = 200;
        $msg = '';
        
        if($_POST){
            //一 url,名称,父节点不能为空
            if($_POST['fid']=='' || !$_POST['fname'] || !$_POST['name'] || !$_POST['url']){
                $state = 400;
            }
            //二 当添加为父菜单 时检查css样式
            if($_POST['fid'] == 0 && $state !=400){
                if(!$_POST['css']) {
                    $state = 300;
                    $msg = '菜单元素缺少样式属性';
                }
            }
            //三 目录名称 相同父节点下菜单名唯一
            if($state !=400){
                $menu = db('menu_type')->where(['fid'=>$_POST['fid'],'name'=>$_POST['name']])->find();
                //不存在时加入
                if(!$menu){
                    $sum = 0;
                    foreach ($_POST['quanxian'] as $val){
                        $sum += $val;
                    }
                    $_POST['quanxian'] = $sum;
                    $_POST['ctime'] = time();
                    unset($_POST['fname']);
                    $lastid = db('menu_type')->insert($_POST);
                    if($lastid) $state = 200;
                }else{
                    $state = 400;
                    $msg = '该菜单下存在相同命名的子菜单';
                }
            }
        }else { $state = 400; }
        
        echo Ajax_JsonMsg($state,$msg);
    }
    
    public function add_menu(){
        $id = $this->getArr['id'];
        if($id && $id !='999999999'){
            $menu = db('menu_type')->where(['id'=>$id])->find();
        }else if($id ==='999999999' ){
            $menu = array('id'=>0,'name'=>'菜单根目录','fid'=>1);
        }
        var_dump($menu);
        $this->assign('menu',$menu);
        return $this->fetch();
    }
    
    public function index2(){
        echo json_encode(['name'=>'tom','age'=>18,'sex'=>'女']);
    }
    
    public function menu_list(){
        
        $menu = $this->Get_menu_list();

        $this->assign('JSONlist',json_encode($menu));
        $this->assign('list',$menu);
        //return $this->fetch("public/editorl");
        return $this->fetch();
    }
    
    
    public function Get_menu_list(){
        $menu_list = $fid =[];
        $group = db('menu_type')->field('id,fid,name')->order(['fid'=>'DESC'])->select();
        //$group = db('menu_type')->field('id,fid,name')->select();
        
        //action('Admin/Index/set_menu',['id'=>666]);
        //echo db('menu_type')->getLastSql();exit;
        //$group = db('menu_type')->field('id,fid,name')->order('fid')->select();
        foreach ($group as $gk=>$gv){
            $fid[$gv['fid']] = $gv['fid'];
            $arr[] = $gv;
        }
        
        foreach ($fid as $k => $v){
            $son = [];$k_num ='';
            if ($fid ==0 ) continue;
            foreach ($arr as $key => $val){
                if($val['id'] == $v) $k_num = $key;
                if($val['fid'] == $v){
                    $son[] = $val; unset($arr[$key]); //删除已找到的元素
                }
            }
            $arr[$k_num]['son'] = $son; $menu_list = $arr[$k_num];
            //if($k_num && $son){ $arr[$k_num]['son'] = $son; $list = $arr[$k_num]; }
        }
        return $menu_list['son'];
    }
    
}
