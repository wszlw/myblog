<?php
namespace app\admin\validate; //一定要注意命名空间
use think\Validate;

//公用的验证类
class Common extends Validate
{
    /**
     * 实例化验证类 格式：[模块名/]验证器名
     * @access public
     * @param  string $name         资源地址
     * @param  string $layer        验证层名称
     * @param  bool   $appendSuffix 是否添加类名后缀
     * @param  string $common       公共模块名
     * @return object|false
     * @throws ClassNotFoundException
     */
    //public static function validate($name = '', $layer = 'validate', $appendSuffix = false, $common = 'common')
    
    /**
        require    必须验证
        alpha       是否为字母
        alphaNum    是否为字母和数字
        alphaDash    是否为字母、数字，下划线  _及破折号  -
        number    是否为数字
        integer    是否为整型（注意大小范围）
        float    是否为浮点型
        boolean    是否为布尔型
        email    是否为有效的邮箱格式
        array    是否为数组
        accepted    是否为  yes、  on或者  1
        date    是否为有效的日期格式
        activeUrl    是否为有效的IP地址或者域名
        url    是否为有效的URL地址
        ip    是否为有效的IP地址（支持ipv4和ipv6）
        in    是否在某个范围内
        notin    是否不在某个范围内
        between    是否在某个区间
        notBetween    是否不在某个区间
        length    长度是否为指定长度或者区间
        max    长度最大值
        min    长度最小值
        after    是否在某个日期之后
        before    是否在某个日期之前
        expire    是否在某个日期区间
        allowIp    请求IP是否是某个值或者范围
        denyIp    是否禁止某个或者范围的IP地址
        confirm    是否和另外一个字段值相同
        different    是否和另外一个字段值不同
        >、  >=、  <、  <=、  =    值比较
        regex    正则验证
        file    是否为一个上传文件
        image    是否为一个图像上传文件
        fileExt    允许上传的文件后缀
        fileMime    允许上传的文件类型
        fileSize    上传文件大小限制
        unique    验证数据是否在数据表唯一
        token    表单令牌验证
                    内置验证规则中，下面的验证规则不需要和验证字段强制关联，也就是说可以定义在表单的任何一个必填字段上都有效：  token（令牌验证）、  allowIp（允许访问IP）、  denyIp（禁止访问IP）和  expire（表单提交有效期）。
     */
    
    
    //验证规则定义
    protected $rule = [
        'logpass'  =>  'require|max:32',
        'email' =>  'email',
        'mobile'=>'/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|16[6]|(17[0,3,5-8])|(18[0-9])|19[89])\d{8}$/',
        '__token__'=>'token'
    ];

    protected $message  =   [
        'logpass.require'   => '密码为必须',
        'logpass.max'       => '密码最多不能超过8个字符',
        'mobile.number'     => '号码必须是数字',
        'email'             => '邮箱格式错误',
        '__token__'         =>  '程序口令错误',
    ];
    
    
    /**
     * 验证手机号码
     *
     * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
     * 联通号码段:130、131、132、136、185、186、145
     * 电信号码段:133、153、180、189
     *
     * @param cellphone
     * @return
     */
    
}