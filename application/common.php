<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

//include_once 'E:/www/Common.ini.php'; //引入根目录的函数库
include_once __DIR__.'../../../Common.ini.php';

// 应用公共文件
/**
 * 获取百度ip地址查询
 * @return mixed
 * 伪造浏览器,访问ip请求百度
 * ["location"]=> string(6) "法国" ["titlecont"]=> string(14) "IP地址查询" ["origip"]=> string(13) "77.196.36.153"
 * echo  trim('(张三,李四,王五[)','(,),['); //小发现结果 张三,李四,王五  (trim 可以用,号分割多个参数)
 */
function httpGetInfo_ip($ip) {
    if(!$ip) { return false;}
    $ip=mt_rand(11, 191).".".mt_rand(0, 240).".".mt_rand(1, 240).".".mt_rand(1, 240);   //随机ip
    //$curlurl = "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query={$ip}&co=&resource_id=6006&t=1537517829762&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=jQuery110203581108425441064_1537514121139&_=1537514121146";
    $curlurl = "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query={$ip}&resource_id=6006";
     
    $agentarry=[
        //PC端的UserAgent
        "safari 5.1 – MAC"=>"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11",
        "safari 5.1 – Windows"=>"Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
        "Firefox 38esr"=>"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0",
        "IE 11"=>"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
        "IE 9.0"=>"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0",
        "IE 8.0"=>"Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "IE 7.0"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "IE 6.0"=>"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)",
        "Firefox 4.0.1 – MAC"=>"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Firefox 4.0.1 – Windows"=>"Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
        "Opera 11.11 – MAC"=>"Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11",
        "Opera 11.11 – Windows"=>"Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11",
        "Chrome 17.0 – MAC"=>"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11",
        "傲游（Maxthon）"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)",
        "腾讯TT"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)",
        "世界之窗（The World） 2.x"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        "世界之窗（The World） 3.x"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)",
        "360浏览器"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)",
        "搜狗浏览器 1.x"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)",
        "Avant"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)",
        "Green Browser"=>"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
        //移动端口
        "safari iOS 4.33 – iPhone"=>"Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "safari iOS 4.33 – iPod Touch"=>"Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "safari iOS 4.33 – iPad"=>"Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
        "Android N1"=>"Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
        "Android QQ浏览器 For android"=>"MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
        "Android Opera Mobile"=>"Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/build-1107180945; U; en-GB) Presto/2.8.149 Version/11.10",
        "Android Pad Moto Xoom"=>"Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
        "BlackBerry"=>"Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+",
        "WebOS HP Touchpad"=>"Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.70 Safari/534.6 TouchPad/1.0",
        "UC标准"=>"NOKIA5700/ UCWEB7.0.2.37/28/999",
        "UCOpenwave"=>"Openwave/ UCWEB7.0.2.37/28/999",
        "UC Opera"=>"Mozilla/4.0 (compatible; MSIE 6.0; ) Opera/UCWEB7.0.2.37/28/999",
        "微信内置浏览器"=>"Mozilla/5.0 (Linux; Android 6.0; 1503-M02 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036558 Safari/537.36 MicroMessenger/6.3.25.861 NetType/WIFI Language/zh_CN",
    ];
    $useragent=$agentarry[array_rand($agentarry,1)];  //随机浏览器useragent
    $header = array(
        'CLIENT-IP:'.$ip,
        'X-FORWARDED-FOR:'.$ip,
    );    //构造ip


    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, ($curlurl));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);// 设置curl允许执行的最长秒数
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);// 发起连接前等待超时的时间，如果设置为0，则无限等待
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);//强制使用 HTTP 1.0
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);//是否将curl_exec()获取的信息返回，而不是直接输出
    curl_setopt($ch, CURLOPT_ENCODING,'gzip');// 设置HTTP请求头中"Accept-Encoding: "的值
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,true);// 启用时会将服务器返回的"Location: "放在header中递归的返回给服务器
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5);// 设置HTTP重定向的最大数量，这个选项是和CURLOPT_FOLLOWLOCATION一起使用的
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);// 是否需要进行服务端的SSL证书验证
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);// 是否验证服务器SSL证书中的公用名
    curl_setopt($ch, CURLOPT_HEADER, false);// 是否抓取头文件的信息
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);// 设置HTTP请求头
    curl_setopt($ch, CURLOPT_USERAGENT, $useragent); //模拟常用浏览器的useragent  ua
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    $result = curl_exec($ch);

    $http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    $errno = curl_errno($ch);
    $error = curl_error($ch);

    curl_close($ch);

    $res = iconv("GBK", "utf-8",$result);
    //这个正则 是 ( 匹配(.*)中任意数据  ) ?如果为真   后面以前面为结果在匹配[中数据]
    preg_match("/(\(.*\))?\[.*\]/xs",$res,$matches);
    $str = json_decode($matches[0],true);
    return  $str;
}

/**
 * 统一ajax 返回状态 并对应默认的 提示信息
 * @param unknown $param
 * @return string
 */
function Ajax_JsonMsg($code,$msg='',$is_token){
    global $__ERR__; $json = [];
    
    if(!$__ERR__[$code]){ $code = 300; }
    if ($is_token) $json['__token__']= request()->token();
    
    $json['code'] = $code;
    $json['title'] = $__ERR__[$code]['title'] ? : '发生错误' ;
    $json['msg'] = $msg ? $msg :  $__ERR__[$code]['msg'];
    return json_encode($json);
}
/**
 * $type = array(0=>'未获取',1=>'post',2=>'get',3=>'ajax',9=>'cli命令行')
 */
function Is_HttpType(){
    $type = 0; $is_get = 0;
    //是否是POST提交
    if(($_SERVER['REQUEST_METHOD'] == 'POST') && (empty($_SERVER['HTTP_REFERER']) || preg_replace("~https?:\/\/([^\:\/]+).*~i", "\\1", $_SERVER['HTTP_REFERER']) == preg_replace("~([^\:]+).*~", "\\1", $_SERVER['HTTP_HOST']) ) ){
        $type = 1;
    }
    //是否是GET提交
    if( $_SERVER['REQUEST_METHOD'] == 'GET' ){
        $type = 2; $is_get = 2;
    }
    //是否是AJAX提交
    if (@isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ( strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')) {
        $type = 3;
    }
    //是否命令行
    if((PHP_SAPI === 'cli' OR defined('STDIN'))){
        $type = 9;
    }
    //当是get的ajax 请求时 并且未填写 token,访问类型为get 并限制部分数据权限,记录日志
    if ($is_get == 2 && $type == 3 && empty($_GET['__token__'])){
        $type = 2;
    }
    return $type;
}

/**
 * 获取时间戳(10位)
 * $str = int | string
 */
function get_intTime($str){
    $res = null;
    if(is_numeric($str)){
        if (strlen($str)==13) $res = intval($str * 0.001);
    }else{
        $res = strtotime($str);
    }
    return $res;
}

/**
 * web 页展示时的过滤
 * @param unknown $html
 * @return mixed
 */
function  get_web_html(&$html,$id){
    $Img =''; $Text ='';
    $html = html_entity_decode($html); 
    preg_match("/<img.*?\/>/",  $html , $matches);
    if(!empty($matches)){
        $a = '<a href="index/content/id/'.$id.'.html" target="_blank">';
        @$Img = $a . $matches[0] .'</a>';
    }
    $Text = mb_substr(strip_tags($html), 0,100,'utf-8');
    return $Img.$Text.'...';
}

//注册函数  摘抄
if (!function_exists('__mkdir')):
  /**
    * 循环创建目录
    * Enter description here ...
    * @param unknown_type $dir
    */
    function __mkdir($path, $mod = 0775, $recursive = False)
    {
        $dir_arr = array($path);
        while ($path !== '/') { $path = $dir_arr[] = dirname($path); }
        $dir_arr = array_reverse($dir_arr);
        foreach ($dir_arr as $dir) {
            if (substr_count($dir, '/') < 2) { continue; }
            if ( !is_dir($dir) ) {
                if ( !is_writable(dirname($dir)) ) { return False; }
                mkdir($dir, $mod);
            }
        }
    }
endif;

/**
 * 判断是否手机端
 * @return boolean
 */
function isMobile() {
    // 如果有HTTP_X_WAP_PROFILE则一定是移动设备
    if (isset($_SERVER['HTTP_X_WAP_PROFILE'])) {
        return true;
    }
    // 如果via信息含有wap则一定是移动设备,部分服务商会屏蔽该信息
    if (isset($_SERVER['HTTP_VIA'])) {
        // 找不到为flase,否则为true
        return stristr($_SERVER['HTTP_VIA'], "wap") ? true : false;
    }
    // 脑残法，判断手机发送的客户端标志,兼容性有待提高。其中'MicroMessenger'是电脑微信
    if (isset($_SERVER['HTTP_USER_AGENT'])) {
        $clientkeywords = array('nokia','sony','ericsson','mot','samsung','htc','sgh','lg','sharp','sie-','philips','panasonic','alcatel','lenovo','iphone','ipod','blackberry','meizu','android','netfront','symbian','ucweb','windowsce','palm','operamini','operamobi','openwave','nexusone','cldc','midp','wap','mobile','MicroMessenger');
        // 从HTTP_USER_AGENT中查找手机浏览器的关键字
        if (preg_match("/(" . implode('|', $clientkeywords) . ")/i", strtolower($_SERVER['HTTP_USER_AGENT']))) {
            return true;
        }
    }
    // 协议法，因为有可能不准确，放到最后判断
    if (isset ($_SERVER['HTTP_ACCEPT'])) {
        // 如果只支持wml并且不支持html那一定是移动设备
        // 如果支持wml和html但是wml在html之前则是移动设备
        if ((strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') !== false) && (strpos($_SERVER['HTTP_ACCEPT'], 'text/html') === false || (strpos($_SERVER['HTTP_ACCEPT'], 'vnd.wap.wml') < strpos($_SERVER['HTTP_ACCEPT'], 'text/html')))) {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否微信
 */
function isWeixin() {
    if (@strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false) {
        return true;
    } else {
        return false;
    }
}