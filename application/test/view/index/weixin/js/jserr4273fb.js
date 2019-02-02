"use strict"
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},BJ_REPORT=function(e){function n(e,n){return!(e.indexOf("TypeError: #<KeyboardEvent> is not a function")>-1||e.indexOf("TypeError: #<MouseEvent> is not a function")>-1)&&(!(e.indexOf("ReferenceError: LIST_INFO is not defined")>-1)&&(!(e.indexOf("TypeError: e is not a constructor")>-1)&&((!location||!/token=\d+/.test(location.href)||"0"!=wx.uin)&&(!(/Mozilla\/5.0.*ipad.*BaiduHD/i.test(n)&&e.indexOf("ReferenceError: Can't find variable: bds")>-1)&&!(/Linux; U; Android.*letv/i.test(n)&&e.indexOf("ReferenceError: diableNightMode is not defined")>-1)))))}if(e.BJ_REPORT)return e.BJ_REPORT
var r=[],t={uin:0,url:"https://badjs.weixinbridge.com/badjs",combo:0,level:4,ignore:[],random:1,delay:0,submit:null},i=function(e,n){return Object.prototype.toString.call(e)==="[object "+(n||"Object")+"]"},o=function(e){return"object"===(void 0===e?"undefined":_typeof(e))&&!!e},c=function(e){return null===e||!i(e,"Number")&&!e},a=e.onerror
e.onerror=function(r,t,o,c,u){var g=r
u&&u.stack&&(g=s(u)),i(g,"Event")&&(g+=g.type?"--"+g.type+"--"+(g.target?g.target.tagName+"::"+g.target.src:""):""),t&&t.length>0&&/^https\:\/\/(mp\.weixin\.qq\.com|res\.wx\.qq\.com)/.test(t),(1!=o||1!=c&&86!=c&&69!=c||-1!=r.indexOf("eval"))&&0!=n(g,window.navigator.userAgent)&&(h.push({msg:g+"|onerror",target:t,rowNum:o,colNum:c}),m(),a&&a.apply(e,arguments))}
var s=function(e){var n=e.stack.replace(/\n/gi,"").split(/\bat\b/).slice(0,5).join("@").replace(/\?[^:]+/gi,""),r=e.toString()
return n.indexOf(r)<0&&(n=r+"@"+n),n},u=function(e,n){var r=[],i=[],a=[]
if(o(e)){e.level=e.level||t.level
for(var s in e){var u=e[s]
if(!c(u)){if(o(u))try{u=JSON.stringify(u)}catch(e){u="[BJ_REPORT detect value stringify error] "+e.toString()}a.push(s+":"+u),r.push(s+"="+encodeURIComponent(u)),i.push(s+"["+n+"]="+encodeURIComponent(u))}}}return[i.join("&"),a.join(","),r.join("&")]},g=[],f=[],l=function(e){var n=e.replace(/\&_t=\d*/,"")
for(var r in f)if(f[r]==n)return
if(f.push(n),t.submit)t.submit(e)
else{var i=new Image
g.push(i),i.src=e}var o="error"
if((o=e.match(/msg=(.*?)&/))&&o[1]&&(o=o[1]),wx&&wx.uin&&(o+=encodeURIComponent("|uin|"+wx.uin)),t.key){(i=new Image).src="/misc/jslog?id="+t.key+"&content="+o+"&level=error"}(new Image).src="/misc/jslog?id=65&content="+o+"&level=error"},d=[],p=0,m=function(e){if(t.report){for(;r.length;){var n=!1,o=r.shift(),c=u(o,d.length)
if(i(t.ignore,"Array"))for(var a=0,s=t.ignore.length;a<s;a++){var g=t.ignore[a]
if(i(g,"RegExp")&&g.test(c[1])||i(g,"Function")&&g(o,c[1])){n=!0
break}}n||(t.combo?d.push(c[0]):l(t.report+c[2]+"&_t="+ +new Date),t.onReport&&t.onReport(t.id,o))}var f=d.length
if(f){var m=function(){clearTimeout(p),console.log("comboReport"+d.join("&")),l(t.report+d.join("&")+"&count="+f+"&_t="+ +new Date),p=0,d=[]}
e?m():p||(p=setTimeout(m,t.delay,!0),console.log("_config.delay"+t.delay))}}},h={KEY:67,IDS:{DEFAULT:"5",MASS:"6",SELF_MENU:"7",LINK:"11",AUTO_REPLY:"12",COMMENT:"13",VOTE:"14",KF:"15",REWARD:"16",COPYRIGHT:"17",MSG:"18",USER:"19",LIST:"20",AUDIO:"21",VEDIO:"22",APPMSG:"4",AD:"23",ANALYSIS:"24",SETTING:"25",VERIFY:"26",SAFE:"27",ILLEGAL:"28",ADVANCED:"29",REGISTER:"30",TMPL:"31",IE:"32",CARD:"33",SHOP:"34",TMPLMSG:"35",HOME:"36",Android:"37",IOS:"38",IBEACON:"72",MERCHANT:"82"},destory:function(){m=function(){}},push:function(e,i){if(Math.random()>=t.random)return h
var c
if(o(e)){if(c=function(e){try{if(e.stack){var r=e.stack.match("https?://[^\n]+"),t=(r=r?r[0]:"").match(":(\\d+):(\\d+)")
t||(t=[0,0,0])
var i=s(e).replace(/https?\:\/\/.*?\.js\:/g,"")
return 0==n(i,window.navigator.userAgent)?null:{msg:i,rowNum:t[1],colNum:t[2],target:r.replace(t[0],"")}}return e}catch(n){return e}}(e),i&&(c.msg+="["+i+"]"),c){if(c.target&&0==/^https?\:\/\/(mp\.weixin\.qq\.com|res\.wx\.qq\.com)/.test(c.target))return h
r.push(c)}}else i&&(e+="["+i+"]"),r.push({msg:e})
return m(),h},report:function(e,n){return e&&h.push(e,n),h},info:function(e){return e?(o(e)?e.level=2:e={msg:e,level:2},h.push(e),h):h},debug:function(e){return e?(o(e)?e.level=1:e={msg:e,level:1},h.push(e),h):h},init:function(e){for(var n in e)t[n]=e[n]
var r=parseInt(t.id,10)
n=parseInt(t.key,10)
return window.navigator.userAgent&&/;\s*MSIE\s*[8|7]\.0b?;/i.test(window.navigator.userAgent)?(r=h.IDS.IE,n=0):window.navigator.userAgent.indexOf("Android")>-1||window.navigator.userAgent.indexOf("Adr")>-1?(r=h.IDS.Android,n=0):window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&(r=h.IDS.IOS,n=0),r&&n&&(t.report=t.url+"?id="+r+"&key="+n+"&uin="+(wx&&wx.uin)+"&from="+encodeURIComponent(location.href)+"&"),h},monitor:function(e,n,r){if(n=n||"badjs|monitor",e){(new Image).src="/misc/jslog?id="+e+"&content="+encodeURIComponent(n)+"&level=error"}if(r){(new Image).src=t.url+"?id="+r+"&msg="+encodeURIComponent(n)+"&uin="+(wx&&wx.uin)+"&from="+encodeURIComponent(location.href)+"&level=4"}},getConfig:function(){return t},__onerror__:e.onerror}
return"undefined"!=typeof console&&console.error&&setTimeout(function(){var e=((location.hash||"").match(/([#&])BJ_ERROR=([^&$]+)/)||[])[2]
e&&console.error("BJ_ERROR",decodeURIComponent(e).replace(/(:\d+:\d+)\s*/g,"$1\n"))},0,!0),t.id=h.IDS.DEFAULT,t.key=h.KEY,function(){if(t.id!=h.IDS.DEFAULT||t.key!=h.KEY)return{id:t.id,key:t.key}
var e={_href:location.href,href:location.href.replace("https://mp.weixin.qq.com/","")}
e.href.indexOf("?")>-1?e.cgi=e.href.match(/.*?\?/g)[0].slice(0,-1):e.cgi=e.href
var n=(e.href+"&").match(/action\=(.*?)&/)
n&&n[1]&&(e.action=n[1])
var r=h.IDS.DEFAULT,i=h.KEY
"cgi-bin/masssendpage"==e.cgi?(r=h.IDS.MASS,i=66):"advanced/autoreply"==e.cgi?(r=h.IDS.AUTO_REPLY,i=70):"advanced/selfmenu"==e.cgi?(r=h.IDS.SELF_MENU,i=68):"misc/appmsgcomment"==e.cgi?(r=h.IDS.COMMENT,i=71):"cgi-bin/newoperatevote"==e.cgi?(r=h.IDS.VOTE,i=72):"misc/kf"==e.cgi?(r=h.IDS.KF,i=73):"merchant/rewardstat"==e.cgi||"merchant/reward"==e.cgi?(r=h.IDS.REWARD,i=74):"cgi-bin/appmsgcopyright"==e.cgi||"cgi-bin/imgcopyright"==e.cgi||"cgi-bin/ori_video"==e.cgi?(r=h.IDS.COPYRIGHT,i=75):"cgi-bin/message"==e.cgi?(r=h.IDS.MSG,i=76):"cgi-bin/user_tag"==e.cgi?(r=h.IDS.USER,i=77):"cgi-bin/appmsg"==e.cgi&&("list_card"==e.action||"list"==e.action)||"cgi-bin/filepage"==e.cgi?(r=h.IDS.LIST,i=78):"cgi-bin/operate_voice"==e.cgi?(r=h.IDS.AUDIO,i=79):"cgi-bin/appmsg"==e.cgi&&"video_edit"==e.action?(r=h.IDS.VEDIO,i=80):"cgi-bin/appmsg"==e.cgi&&"edit"==e.action?(r=h.IDS.APPMSG,i=62):"cgi-bin/frame"==e.cgi&&/t=ad_system/.test(e.href)||/merchant\/ad_/.test(e.cgi)?(r=h.IDS.AD,i=81):"misc/useranalysis"==e.cgi||"misc/appmsganalysis"==e.cgi||"misc/menuanalysis"==e.cgi||"misc/messageanalysis"==e.cgi||"misc/interfaceanalysis"==e.cgi?(r=h.IDS.ANALYSIS,i=82):"cgi-bin/settingpage"==e.cgi||"acct/contractorinfo"==e.cgi?(r=h.IDS.SETTING,i=83):"merchant/store"==e.cgi||"merchant/order"==e.cgi||"acct/wxverify"==e.cgi?(r=h.IDS.VERIFY,i=84):"cgi-bin/safecenterstatus"==e.cgi?(r=h.IDS.SAFE,i=85):"cgi-bin/illegalrecord"==e.cgi?(r=h.IDS.ILLEGAL,i=86):"advanced/advanced"==e.cgi||"advanced/diagram"==e.cgi||"cgi-bin/frame"==e.cgi&&/t=advanced\/dev_tools_frame/.test(e.href)?(r=h.IDS.ADVANCED,i=87):"acct/contractorpage"==e.cgi?(r=h.IDS.REGISTER,i=88):"cgi-bin/readtemplate"==e.cgi?(r=h.IDS.TMPL,i=89):"advanced/tmplmsg"==e.cgi?(r=h.IDS.TMPLMSG,i=90):"merchant/entityshop"==e.cgi||"merchant/newentityshop"==e.cgi?(r=h.IDS.SHOP,i=92):"merchant/goods"==e.cgi||"merchant/goodsgroup"==e.cgi||"merchant/shelf"==e.cgi||"merchant/goodsimage"==e.cgi||"merchant/delivery"==e.cgi||"merchant/productorder"==e.cgi||"merchant/merchantstat"==e.cgi||"merchant/introduction"==e.cgi||"merchant/merchantpush"==e.cgi||"merchant/merchantentrance"==e.cgi?(r=h.IDS.MERCHANT,i=104):"cgi-bin/home"==e.cgi?(r=h.IDS.HOME,i=93):"merchant/cardapply"==e.cgi&&"listapply"==e.action?i=95:e.cgi.indexOf("beacon")>-1&&(r=h.IDS.IBEACON,i=96),t.id=r,t.key=i,wx&&"en_US"==wx.lang&&(r=125,i=125)}(),h.init(),h}(window)
!function(e){if(e.BJ_REPORT){var n,r=function(n,r){n?n.stack?n.stack+="|try":n.msg&&(n.msg+="|try"):"string"==typeof n&&(n+="|try"),e.BJ_REPORT.report(n,r)},t=e.BJ_REPORT.tryJs=function(e){return e&&(r=e),t},i=function(e,n){var r
for(r in n)e[r]=n[r]},o=function(e){return"function"==typeof e},c=function(t,i){return function(){try{return t.apply(this,i||arguments)}catch(t){if(r(t),t.stack&&console&&console.error&&console.error("[BJ-REPORT]",t.stack),!n){var o=e.onerror
e.onerror=function(){},n=setTimeout(function(){e.onerror=o,n=null},50)}throw t}}},a=function(t,i){return function(){try{return t.apply(this,arguments)}catch(t){if(r(t,i),t.stack&&console&&console.error&&console.error("[BJ-REPORT]",t.stack),!n){var o=e.onerror
e.onerror=function(){},n=setTimeout(function(){e.onerror=o,n=null},50)}throw t}}},s=function(e){return function(){for(var n,r=[],t=0,i=arguments.length;t<i;t++)n=arguments[t],o(n)&&(n=c(n)),r.push(n)
return e.apply(this,r)}},u=function(e){return function(n,r){if("string"==typeof n)try{n=new Function(n)}catch(e){throw e}var t=[].slice.call(arguments,2)
return n=c(n,t.length&&t),e(n,r)}},g=function(e,n){return function(){for(var r,t,i=[],a=0,s=arguments.length;a<s;a++)r=arguments[a],o(r)&&(t=c(r))&&(r.tryWrap=t)&&(r=t),i.push(r)
return e.apply(n||this,i)}},f=function(e){var n,r
for(n in e)r=e[n],o(r)&&(e[n]=c(r))
return e}
t.spyJquery=function(){var n=e.$
if(!n||!n.event)return t
var r=n.event.add,i=n.ajax,c=n.event.remove
if(r&&(n.event.add=g(r),n.event.remove=function(){for(var e,n=[],r=0,t=arguments.length;r<t;r++)e=arguments[r],o(e)&&(e=e.tryWrap),n.push(e)
return c.apply(this,n)}),i&&(n.ajax=function(e,r){return r||(r=e,e=void 0),f(r),e?i.call(n,e,r):i.call(n,r)}),$.zepto){var a=n.fn.on,s=n.fn.off
n.fn.on=g(a),n.fn.off=function(){for(var e,n=[],r=0,t=arguments.length;r<t;r++)e=arguments[r],o(e)&&(e=e.tryWrap),n.push(e)
return s.apply(this,n)}}return t},t.spyModules=function(){var n=e.require,r=e.define
return r&&r.amd&&n&&(e.require=s(n),i(e.require,n),e.define=s(r),i(e.define,r)),e.seajs&&r&&(e.define=function(){for(var e,n=[],t=0,i=arguments.length;t<i;t++)e=arguments[t],o(e)&&((e=a(e,arguments[0])).toString=function(e){return function(){return e.toString()}}(arguments[t])),n.push(e)
return r.apply(this,n)},e.seajs.use=s(e.seajs.use),i(e.define,r)),t},t.spySystem=function(){return e.setTimeout=u(e.setTimeout),e.setInterval=u(e.setInterval),t},t.spyCustom=function(e){return o(e)?c(e):f(e)},t.spyAll=function(){return t.spyJquery().spyModules().spySystem(),t},t.spyAll()}}(window)
