<?php
use think\Config;
use think\App;

require __DIR__ . '/../extend/define.php'; //引入常量定义文件 zj

/**
 * 引入框架源文件
 */
require __DIR__ . '/..//thinkphp/library/think/App.php';
$app = new App(); $app::$debug = false;

require __DIR__ . '/../thinkphp/library/think/Config.php';
$config = new Config();
//database 框架默认是数据库配置  (其实可以任意变量)
$config->set('database',require __DIR__ . './database.php'); //页面 return 包含时可以当变量赋值
//var_dump($config->get());

require __DIR__ . '/../thinkphp/library/think/Loader.php';
require __DIR__ . '/../thinkphp/library/think/db/Builder.php';
require __DIR__ . '/../thinkphp/library/think/db/builder/Mysql.php';
require __DIR__ . '/../thinkphp/library/think/db/Connection.php';
require __DIR__ . '/../thinkphp/library/think/db/Query.php';
require __DIR__ . '/../thinkphp/helper.php';
require __DIR__ . '/../thinkphp/library/think/db/connector/Mysql.php';
require __DIR__ . '/../thinkphp/library/think/Db.php';