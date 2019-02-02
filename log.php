<?php
/* 配置初始化  */
$cache_time = 30;//缓存刷新时间
$host = 'http://localhost/tp5_blog/';
$cache = false; //缓存是否过期  true 过期  false没过期
$open_cache = false;
$_SERVER = $_SERVER;

/* 获取url数据 */
$url_info = parse_url($_SERVER['REQUEST_URI']);

$url = $host . 'public/index.php/Index/log_content/id/%u.html';
$url = vsprintf($url, array($_GET['id']));

//请求地址
$file_path = pathinfo($url_info['path']);
$filename = __DIR__.'/runtime/html_cache/'.$file_path['basename'];

//获取缓存文件
$html = @file_get_contents($filename);

if($html){
    $stat = @stat($filename);
    /*echo '上次访问时间戳: ' . $stat['atime'].'<br />';
    echo '上次修改戳: ' . $stat['mtime'].'<br />';
    echo '上次改变时间戳: ' . $stat['ctime'].'<br />';*/
    if($stat['mtime'] < (time() - $cache_time) || !$open_cache) $cache = true;     
}

//获取数据
if(!$html || $cache){
    $html = file_get_contents($url);
    //生成缓存文件
    file_put_contents($filename, $html);
}
exit($html);