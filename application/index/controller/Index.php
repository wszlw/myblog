<?php
namespace app\index\controller;
//require APP_PATH.'Index/controller/Inc.php';
//var_dump($arr); echo APP_PATH.'Index/controller/Inc.php';
use think\Session;
//use think\db\Query;
use think\Db;
//use Calendar\Calendar as Calendar; //引入/extend/Calendar.php 第三方类库

class Index extends Base
{
    public $tmp = '';
    public $limit = 5;
    
    //渲染主视图
    public function  index(){
        // get_defined_constants(true); tp自定义的常量
        $uname = Session::get('user_name');
        $uname = $this->request->session('user_name');
       
        $list = db('log')->where(['status'=>1])->limit(0,$this->limit)->order('id', 'desc')->select();        
        
        if(in_array(date('w'), [1,3,5])){$this->tmp = true; }
        $this->assign('day', date("Y-m-d H:i:s W"));
        $this->assign('list', $list);
        return $this->fetch();
    }
    
    //瀑布流的返回
    public function index_list(){
        $last_id = $_POST['last_id'] ? $_POST['last_id'] : $this->limit; 
        file_put_contents('test.txt', $last_id,FILE_APPEND);
        $list = db('log')->where(['status'=>1,'id'=>array('<',$last_id)])->limit(2)->order('id', 'desc')->select();
        foreach ($list as $key=>$val){
            $list[$key]['atime'] = date('Y-m-d H:i:s',$val['atime']);
            $list[$key]['content'] = get_web_html($val['content'],$val['id']);
        }
        //echo  db('log')->getLastSql();
        if(!$list){
            $list = array('code'=>400,'msge'=>'select table nall');
        }
        echo json_encode($list);
    }
    
    //渲染顶部视图
    public function head(){
        $this->assign('name', ' tom');
        $this->assign("base",$this->base);
        
        /* 跨模块调用  */
        //$event = \think\Loader::controller('app\admin\controller\Index');
        //$event = controller('app\admin\controller\Index');
        //$event->index();
        //action('app\admin\controller\Index\index', ['id' => 886688]); //直接调用并带参数 无返回值
        
        
        return $this->fetch();
        return $this->display();
    }
    
    //展示全文内容
    public function log_content($id){
        if(@!$id){ $this->error("id不存在"); }
        $result = db('log')->where(['status'=>1,'id'=>$id])->find();
        $result = $this->content_limit($result);
        //var_dump($result['content']);
        $this->assign('content', $result);
        $this->assign('pages', $this->get_page_limit($id));
        
        if ($this->isMobile){
            return $this->fetch('content6');
        }else{
            return $this->fetch('content6');
        }
    }
    
    //展示全文内容动态跟换
    public function log_content2(){
        $id = $_POST['id'];
        $where = ['status'=>1,'id'=>['>',$id]];
        $desc = 'id';
        if(@!$id){ $this->error("id不存在"); }
        //页面会默认传gt向下,lt向上
        if($_POST['where']=='lt'){
            $where['id'] = ['<',$id];
            $desc = 'id desc';
        }
        //var_dump($_POST);
        $result = db('log')->where($where)->order($desc)->find();
        if($result){
            $result = $this->content_limit($result);
            $result['pages'] = $this->get_page_limit($result['id']);
            echo json_encode($result);
        }else{
            $result = array('code'=>'500','msg'=>'The query result set is empty');
            echo json_encode($result);
        }
    }
    
    
    public function content_limit($result){
        $html = html_entity_decode($result['content']);
        
        //掺入版权链接
        @preg_match_all('/<p.*?>(.*?)<\/p>/s',$html ,$res);
        
        if (!empty($res[1]) && (count($res[1]) >= 3)){
            foreach (array_rand($res[1],3) as $v){
                $html = str_replace($res[1][$v], "<a href='http://www.daylog.com/tp5_blog/public/index.php/Index/log_content/id/".$result['id'].".html' target='_blank' alt='".$result['title']."'>".$res[1][$v].'</a>', $html);
            }    
        }
        //备份并处理数据截断保留数据
        $old_html = $html;
        
        $len = mb_strlen($html,'utf-8');
        //$html = str_replace("&nbsp;", '', $html);
        $end_len = ceil($len * 0.7);
        
        $html = mb_substr($html, 0, $end_len, 'utf-8');
        $len = mb_strlen($html, 'utf-8');
        
        if(mb_substr($html, -4, $len, 'utf-8') !='</p>'){
            $end_len = mb_strrpos($html, '</p>', 'utf-8') + 4;
            $html = mb_substr($html, 0, $end_len, 'utf-8');
        }
        
        $old_end_len = mb_strlen($old_html,'utf-8') - $end_len;
        $end_html =  mb_substr($old_html, $end_len,$old_end_len,'utf-8');

        $span = "\n<div class='read-more'>
            <span id='span1' onclick='opne_height(this,\"#span2\")' style='width: 100%;display: inline-block;text-align: center;'>查看全文 »</span>
            <div id='span2' style='display: none;'>";
        $end_html = $span .$end_html .'</div></div>';
        
        $result['content'] = $html.$end_html;
        return $result;
    }

    //获取上一篇下一篇
    public function get_page_limit($id){
        $sql = "SELECT a.id,a.title,b.id AS id2,b.title AS title2 FROM log AS a
            INNER JOIN log AS b WHERE a.id < ? AND b.id > ? ORDER BY a.id DESC LIMIT 1";
        $pages = DB::query($sql,[$id,$id]);
        //echo  db('log')->getLastSql();
        
        if(!$pages){
            $sql ='SELECT id,title FROM log WHERE
              id = (SELECT id FROM log WHERE id<? ORDER BY id DESC LIMIT 1)
              OR id = (SELECT id FROM log WHERE id>? ORDER BY id ASC LIMIT 1)';
            $pages = DB::query($sql,[$id,$id]);
            
            if($pages[0]['id'] < $id){
                $pages[0]['id2'] = 0; $pages[0]['title2'] = '神马?这个懒人,尽然没有了!';
            }else{
                $pages[0]['id2'] = $pages[0]['id']; $pages[0]['title2'] = $pages[0]['title'];
                $pages[0]['id'] = 0; $pages[0]['title'] = '不能再往前了,已经到根儿了!';
            }
        }
        return $pages;
    }

    //获取日历
    public function Calendar_api(){
        //引入三方类库 引入日历 实例化要加 \ 实际路径 extend/Calendar/Calendar.php
        import('Calendar.Calendar', EXTEND_PATH);
        
        @$type = $_GET['type']?$_GET['type']:1;
        @$y = $_GET['y']?$_GET['y']:'';
        @$m = $_GET['m']?$_GET['m']:'';
        $obj = new \Calendar();
        echo  $obj->getCalendar($y,$m,$type);
        return;
        /*
        if(@$this->getArr['token']){
            echo $obj->getCalendar($y,$m,$type);
        }*/
    }
    
    public function time_arr(){
        return $this->fetch('public/pub_time');
    }
}
