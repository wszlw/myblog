<?php
// /tp5_blog/runtime/html_cache

$filename = __DIR__.'/runtime/html_cache/init.conf';

//获取缓存文件
$html = @file_get_contents($filename);

if($html){
    $cache_time = 30;//缓存刷新时间
    $stat = @stat($filename);
    /*echo '上次访问时间戳: ' . $stat['atime'].'<br />';
     echo '上次修改戳: ' . $stat['mtime'].'<br />';
     echo '上次改变时间戳: ' . $stat['ctime'].'<br />';*/
    if($stat['mtime'] < (time() - $cache_time)) $cache = true;
}
//获取数据
if(!$html || $cache){
    $html = md5(time());
    //生成缓存文件
    file_put_contents($filename, $html);
}



switch ($_GET['debug']){
    case true:
        require_once __DIR__ . '/phpIni/php_ini.php'; //引入常量定义文件 zj
        
        $c_val = $config->get(); //获取配置文件内容
        //验证数据库连接
        $menu = db('menu_type')->find(); echo db('menu_type')->getLastSql();
        
        echo date("[ Y-m-d H:i:s ]");
        break;
    default:
        //header('Location:/tp5_blog/public/index.php');
        require('./public/index.php');
        //include 'http://localhost/tp5_blog/public/index.php';
}