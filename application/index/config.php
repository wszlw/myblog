<?php
return [
    // +----------------------------------------------------------------------
    // | 静态css设置
    // +----------------------------------------------------------------------
    
    // 视图输出字符串内容替换
    'view_replace_str'       => [
    
        '__STATIC_PATH__'  =>__DIR__.'/index/view/public',
    
    ],
    //'view_path' => '../application/Index/view/index/',
    // 是否开启路由
    'url_route_on'           => true,
    // 路由配置文件（支持配置多个）
    'route_config_file'      => ['route'],
    // 是否强制使用路由
    'url_route_must'         => false,
    
];
