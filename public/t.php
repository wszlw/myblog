<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]

//http://localhost/tp5_blog/public/index.php/index/index/hello

define('BIND_MODULE','test');
// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
define('APP_DEBUG',True);

// 定义SESSION保存目录
//define('SESSION_PATH', __DIR__.'./runtime/session/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';
//header_content();

/*
function header_content() {
    echo $url = $_SERVER['REQUEST_URI'];
    if(preg_match('/blog_\d/', $url,$res))
    {
        $id = explode('_', $res[0])[1];
    }
    action('app\index\controller\Index\content', ['id' => $id]);
    return  $id;
    //header('Location: http://www.daylog.com/public/index.php/index/content/id/'.$id);
    
    //exit;
}
*/