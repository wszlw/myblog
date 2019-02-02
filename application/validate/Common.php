<?php
namespace app\validate; //一定要注意命名空间
use think\Validate;

//公用的验证类
class Common extends Validate
{
    //验证规则定义
    protected $rule = [
        'name'  =>  'require|max:6',
        'email' =>  'email',
        'mobile'=>'/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|16[6]|(17[0,3,5-8])|(18[0-9])|19[89])\d{8}$/',
    ];

}