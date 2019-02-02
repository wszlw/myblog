<?php
require_once __DIR__ . '/../phpIni/php_ini.php'; //引入常量定义文件 zj

$json = [];
if($_GET['t']){
    $json['time'] = date('Y-m-d H:i:s',$_GET['t']);
    $json['stime'] = time();
    $json['name'] = 'Tom like Jk';
}

//$event = \think\Loader::controller('application\admin\controller\Index');
//action('app\admin\controller\Index\hello', ['id' => 886688]);
//$menu = db('menu_type')->find();

//echo db('menu_type')->getLastSql();
echo json_encode( $menu );



