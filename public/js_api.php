<?php
session_start();
require_once __DIR__ . '/../phpIni/php_ini.php'; //引入常量定义文件 zj

if(!$_POST['pub_token']){ die('This is not post'); return; }

$pub_token = $_SESSION['think']['pub_token'];
if (!empty($pub_token)){
    if($pub_token['time'] < time()){
        die('This is old time'); return; //小于当前时间时 return
    }
    if ($pub_token['token'] !== $_POST['pub_token']){
        die('This is token false');  return;
    }
}

switch ($_SERVER['QUERY_STRING']){
    case 'Calendar_api':
        include_once '../extend/Calendar/Calendar.php';

        import('Calendar.Calendar', EXTEND_PATH);
        @$type = $_GET['type']?$_GET['type']:1;
        @$y = $_GET['y']?$_GET['y']:'';
        @$m = $_GET['m']?$_GET['m']:'';
        $obj = new Calendar();
        echo  $obj->getCalendar($y,$m,$type);
        break;
    default:
        die("This Work is dump");
}
