<?php
namespace app\admin\controller;

use think\Validate;
use app\admin\model\Log as LogModel;

//当访问方法不存在时执行
class Log extends Base{
    
    static $log_type = null;
    public $modle = null;
    
    public function _initialize(){
        parent::_initialize();
        $this->modle = new LogModel;        // 实例化模型
        if (!log::$log_type){
            log::$log_type = db('log_type')->field('id,name')->where(['status'=>1])->select();
        }
    }
    
    public function add_log()
    {
        $this->assign('log_type', json_encode(log::$log_type));
        return $this->fetch();
    }

    public function add_log_do()
    {
        $rules = ['title'  => 'require|max:100','time'=>'length:13|number','_content'=>'require|min:100'];
        $mssage = ['title.require'  => '标题为必须',
            'title.max'  => '标题最多不能超过100个字符',
            'time'=>'时间日期错误',
            '_content.require'=>'文章内容不能为空',
            '_content.min'=>'文章内容不能少于100字符'
        ];
        $_POST['_content'] = strip_tags($_POST['content']);
        
        $validate = new Validate($rules,$mssage);
        if(!$validate->check($_POST)){
            $this->die_json(400, $validate->getError(),true); 
        }
        
        if($this->Admin['id']){
            unset($_POST['_content']);
            $date['title'] = htmlspecialchars($_POST['title']);
            $date['aid'] = $this->Admin['id'];
            $date['doc'] = $_POST['doc'];
            $date['content'] = htmlspecialchars($_POST['content']);
            $date['type'] = 1;
            $date['uname'] = htmlspecialchars($_POST['uname']);
            $date['ispl'] = intval($_POST['ispl']);
            $date['atime'] = get_intTime($_POST['time']);
            
            //修改
            if ((@$this->getArr['id']) && (@$this->getArr['id'] == @$_POST['id'] )){
                $find = db('log')->where(['aid'=>$date['aid'],'title'=>$date['title'],'id'=>["neq",$this->getArr['id']] ])->find();
                
                if(!empty($find)){
                    $this->die_json(400, '同一管理员不容许添加相同标题的文章',true);
                }
                $date['uptime'] = time();
                //数据入库 记录日志
                $list_id= db('log')->where(['id'=>$this->getArr['id']])->update($date);
            }
            //添加
            else{
                $find = db('log')->where(['aid'=>$date['aid'],'title'=>$date['title']])->field(['id'])->find();
                if(!empty($find)){
                    $this->die_json(400, '同一管理员不容许添加相同标题的文章',true);
                }
                //数据入库 记录日志
                $list_id= db('log')->insert($date);
            }
            
            if($list_id){
                $this->die_json(200, 'blog 文章操作成功');
            }else{
                $this->die_json(400, '数据写入异常请重试!');
            }
        }
    }

    public function log_list(){
        //只查自己的文章别人的看不到
        $list = $this->modle->get_all(['aid'=>$this->Admin['id'],'status'=>1]);
        
        $title = [] ;
        foreach ($list as $val){
            $title[] = ['text'=>$val['title'],'value'=>$val['title']];
        }
        
        $this->assign('title', json_encode($title));
        $this->assign('list', json_encode($list));
        return $this->fetch();
    }
    
    public function edit_log()
    {
        if(@!$this->getArr['id']){ $this->error("id不存在"); }
        
        $result = $this->modle->get($this->getArr['id']);//主键查询
        $html = html_entity_decode($result['content']);
        
        
        //\'单引号 \"	双引号 \&	和号 \\反斜杠 \n换行符\r	回车符\t	制表符\b	退格符\f换页符 页面用单引号接受就要替换文章中单引号
        $search = ["\n","\r","\t","\b","\f","\&","'"]; 
        $replace = ["\\n","\\r","\\t","\\b","\\f","\\&",'"'];
        $result['content'] = str_replace($search, $replace, html_entity_decode($result['content']) );
        //$result['content'] = html_entity_decode($result['content']);
        $this->assign('result', $result);
        $this->assign('log_type', json_encode(log::$log_type));
        
        return $this->fetch();
    }
    
    public function log_type(){
        return $this->fetch();
    }
    
}