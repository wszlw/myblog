<?php
define('DS', DIRECTORY_SEPARATOR);

$parten_arr = array(
    array('/^\/$/', 'index.php', array(), 'index.html'),
    array('/^\/log_(\d+)\.html/', 'log.php?type=content', array(1=>'id')),
    array('/^\/f_(\d+)\.html/', 'app.php?type=share&package=cn.goapk.market', array(1=>'fid')),
    array('/^\/baidu_(\d+)\.html/', 'app.php?type=baidu&package=cn.goapk.market', array(1=>'aid')),
    array('/^\/index_([a-z]+)_(\d+)\.html/', 'index.php', array(1=>'type', 2=>'morelist'), 'index/%1$s_%2$d.html'),
);

$url_info = parse_url($_SERVER['REQUEST_URI']);
$uri = $url_info['path'];

$uri = preg_replace('/(\/+)/', '/', $uri);
$uri = preg_replace('/([a-zA-Z0-9\_]+\/)?/', '', $uri);


$params = array();
foreach ($parten_arr as $val) {

    if (preg_match($val[0], $uri, $m)) {
        $file = $val[1];
        //app.php?type=baidu&package=cn.goapk.market
        //#.+?\.php[\?]?#si  #是分割符 / == /.+?\.php[\?]?/si    parse_str() 将a=b&c=d 解析成$a=b,$c=d,加参数2将解析为关联数组
        parse_str(preg_replace('#.+?\.php[\?]?#si', '', $file), $p);
        //将?号后面的替换为空
        $file = preg_replace('#\?(.*)#si', '', $file);

        //将参数添加的$_GET中
        if (!empty($p)) {
            foreach($p as $k=>$v){
                $_GET[$k] = $v;
            }
        }

        if (isset($val[2])) {
            foreach ($val[2] as $k => $v) {
                $var_name = is_array($v) ? $v[0] : $v;
                $var_value = $m[$k];
                $params[] = $var_value;

                if (is_array($v)) {
                    $var_value = $v[1][$var_value];
                }
                $_GET[$var_name] = $var_value;
            }
        }
        if (isset($val[3])) {
            $file_parten = $val[3];
        }
        include_once('/log.php');
        break;
    }
}
include_once('/404.html');
exit;

//占时用不上的
/*
 ob_start();
 include_once('/404.html');
 $content = ob_get_clean();
 if (empty($content)) { exit; }
 exit($content);
 */

if ($has_rule && $file) {
    //$cache_file = STATIC_DIR;
    $cache_file = dirname(realpath(__FILE__)).'/html_cache/';
    if (!empty($sub_dir) && preg_match('/^[a-z0-9_]+$/', $sub_dir)) {
        $cache_file = $cache_file. DS. $sub_dir. DS;
    }
    if ($file_parten) {
        $cache_file .= vsprintf($file_parten, $params);
    } else {
        $cache_file .= $uri;
    }

    $_SERVER['SCRIPT_NAME'] = $file;
    $_SERVER['QUERY_STRING'] = http_build_query($_GET);
    mkdir(dirname($cache_file),0755,true);
     
    ob_start();
    include_once($file);
    $content = ob_get_clean();
    if (empty($content)) {
        exit;
    }
    file_put_contents($cache_file, $content);
    exit($content);
}
