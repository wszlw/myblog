<?php
define('DS', DIRECTORY_SEPARATOR);

$HOST = $_SERVER['HTTP_HOST'] ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];


$is_http = $_SERVER['REDIRECT_REQUEST_METHOD'];



/*
$URL_info = $_SERVER['REQUEST_URI'];
//?<=exp):零宽度正回顾后发断言，它断言自身出现的位置的前面能匹配表达式exp
// /(?<=name:)(wangfei)/  匹配前面为name:，结果为wangfei
preg_match('/(?<=\/tp5_blog\/)(.*)/', $URL_info, $preg_res);
$base_res = base64_decode($preg_res[0]);
*/
$parten_list = array(
    //array('/^\/$/', 'index.php', array(), 'index.html'),
    //array('/(?<=\/tp5_blog\/).*/', 'log.php?type=content', array(1=>'id'), 'index.html'),
    array('/(?<=^\/).*[^html]$/', 'log.php', array(1=>'id'), 'index.html'),
    array('/^\/log_(\d+)\.html/', 'log.php', array(1=>'id')),
    array('/^\/f_(\d+)\.html/', 'app.php?type=share&package=cn.goapk.market', array(1=>'fid')),
    array('/^\/baidu_(\d+)\.html/', 'app.php?type=baidu&package=cn.goapk.market', array(1=>'aid')),
    array('/^\/index_([a-z]+)_(\d+)\.html/', '/index.php', array(1=>'type', 2=>'morelist'), 'index/%1$s_%2$d.html'),
);

get_url_luyou($parten_list);


function get_url_luyou($parten_list){
    $URL_info = $_SERVER['REQUEST_URI'];
    
    //$URL_info = preg_replace('/(\/+)/', '/', $URL_info);
    $URL_info = preg_replace('/([a-zA-Z0-9\_]+\/)?/', '', $URL_info);
    
    foreach ($parten_list as $val) {
        preg_match($val[0], $URL_info, $res);
        if (preg_match($val[0], $URL_info, $res)) {
            
            $php = $val[1];
            //base 64
            @$base64 = intval(base64_decode($res[0]));
            if($base64){
                $_GET['id'] = $base64;
                include_once('/log.php');
                break;
            }else{
                $params = array();
                //将参数添加的$_GET中
                if(isset($val[2])) {
                    foreach ($val[2] as $k => $v) {
                        $var_name = is_array($v) ? $v[0] : $v;
                        $var_value = is_array($v) ? $v[1][$var_value] : $res[$k];
                        $params[$k] = $var_value;
                        $_GET[$var_name] = $var_value;
                    }
                }
                
                if(isset($val[3])) {
                    $html = vsprintf($val[3], $params);
                }
                if(@file_get_contents($val[1])){
                    include_once($val[1]);
                }else{
                    include_once('/404.html');
                }
            }
        }
    }
    include_once('/404.html');
}



