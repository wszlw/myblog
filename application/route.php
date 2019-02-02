<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // 全局变量规则
    '__pattern__' => [
        'name' => '\w+',
    ],
    //分组路由
    /* '[index]' => [
        //路由规则
        //':index'   => ['index', ['method' => 'get'], ['id' => '\d+']],
        ':index'   => ['index/index', ['method' => 'get']],
        //http://localhost/tp5_blog/public/index.php/index/15.html 访问路径
        
    ], */
    //http://localhost/tp5_blog/public/admin.php/index/hello
    '[Index/hello]' => [
        ':index'   => ['admin/Login/hello1',['method' => 'get'],['index' => '\d+']],
    ],
    '[Login]' => [
        ':index'   => ['admin/Index/hello1',['method' => 'get'],['index' => '\d+']],
    ],
    
    
];
/*
这里是控制/器方法
'[Index/hello]' => [
                        参数key        实际访问地址                             访问方式                                    参数匹配
        ':index'   => ['admin/Login/hello1',['method' => 'get'],['index' => '\d+']],
    ],
 定义时 定义访问get 其他访问不生效,  设置匹配参数 访问必须带参数
 
 
   
   */