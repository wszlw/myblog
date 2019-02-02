define("3rd/webuploader/base.js",["3rd/webuploader/promise.js"],function(r,t,e){function o(r,t){return function(){return r.apply(t,arguments)}}var n=r("3rd/webuploader/promise.js"),a=function(){},i=Function.call
return{version:"@version@",$:$,Deferred:n.Deferred,isPromise:n.isPromise,when:n.when,browser:function(r){var t={},e=r.match(/WebKit\/([\d.]+)/),o=r.match(/Chrome\/([\d.]+)/)||r.match(/CriOS\/([\d.]+)/),n=r.match(/MSIE\s([\d\.]+)/)||r.match(/(?:trident)(?:.*rv:([\w.]+))?/i),a=r.match(/Firefox\/([\d.]+)/),i=r.match(/Safari\/([\d.]+)/),c=r.match(/OPR\/([\d.]+)/)
return e&&(t.webkit=parseFloat(e[1])),o&&(t.chrome=parseFloat(o[1])),n&&(t.ie=parseFloat(n[1])),a&&(t.firefox=parseFloat(a[1])),i&&(t.safari=parseFloat(i[1])),c&&(t.opera=parseFloat(c[1])),t}(navigator.userAgent),os:function(r){var t={},e=r.match(/(?:Android);?[\s\/]+([\d.]+)?/),o=r.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/)
return e&&(t.android=parseFloat(e[1])),o&&(t.ios=parseFloat(o[1].replace(/_/g,"."))),t}(navigator.userAgent),inherits:function(r,t,e){var o
return"function"==typeof t?(o=t,t=null):o=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return r.apply(this,arguments)},$.extend(!0,o,r,e||{}),o.__super__=r.prototype,o.prototype=function(r){var t
return Object.create?Object.create(r):(t=function(){},t.prototype=r,new t)}(r.prototype),t&&$.extend(!0,o.prototype,t),o},noop:a,bindFn:o,log:window.console?o(console.log,console):a,nextTick:function(r){setTimeout(r,1)},slice:function(r){return function(){return i.apply(r,arguments)}}([].slice),guid:function(){var r=0
return function(t){for(var e=(+new Date).toString(32),o=0;o<5;o++)e+=Math.floor(65535*Math.random()).toString(32)
return(t||"wu_")+e+(r++).toString(32)}}(),formatSize:function(r,t,e){var o
for(e=e||["B","K","M","G","TB"];(o=e.shift())&&r>1024;)r/=1024
return("B"===o?r:r.toFixed(t||2))+o}}})
define("3rd/webuploader/promise.js",["3rd/jquery/jquery.2.1.4.js"],function(e,r,n){return window.$=e("3rd/jquery/jquery.2.1.4.js"),{Deferred:$.Deferred,when:$.when,isPromise:function(e){return e&&"function"==typeof e.then}}})
define("3rd/webuploader/widgets/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/filepicker.js","3rd/webuploader/widgets/widget.js"],function(e,i,r){var t=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/uploader.js"),s=e("3rd/webuploader/lib/filepicker.js")
e("3rd/webuploader/widgets/widget.js")
var d=t.$
return d.extend(n.options,{pick:null,accept:null}),n.register({name:"picker",init:function(e){return this.pickers=[],e.pick&&this.addBtn(e.pick)},refresh:function(){d.each(this.pickers,function(){this.refresh()})},addBtn:function(e){var i=this,r=i.options,n=r.accept,c=[]
if(e)return d.isPlainObject(e)||(e={id:e}),d(e.id).each(function(){var a,o,p
p=t.Deferred(),a=d.extend({},e,{accept:d.isPlainObject(n)?[n]:n,swf:r.swf,runtimeOrder:r.runtimeOrder,imageSize:r.imageSize,id:this}),(o=new s(a)).once("ready",p.resolve),o.on("select",function(e){i.owner.request("add-file",[e])}),o.init(),i.pickers.push(o),c.push(p.promise())}),t.when.apply(t,c)},disable:function(){d.each(this.pickers,function(){this.disable()})},enable:function(){d.each(this.pickers,function(){this.enable()})},destroy:function(){d.each(this.pickers,function(){this.destroy()}),this.pickers=null}})})
define("3rd/webuploader/uploader.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(e,t,i){function r(e){this.options=o.extend(!0,{},r.options,e),this._init(this.options)}var s=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/mediator.js"),o=s.$
return r.options={},n.installTo(r.prototype),o.each({upload:"start-upload",stop:"stop-upload",getFile:"get-file",getFiles:"get-files",addFile:"add-file",addFiles:"add-file",sort:"sort-files",removeFile:"remove-file",cancelFile:"cancel-file",skipFile:"skip-file",retry:"retry",isInProgress:"is-in-progress",makeThumb:"make-thumb",md5File:"md5-file",getDimension:"get-dimension",addButton:"add-btn",predictRuntimeType:"predict-runtime-type",refresh:"refresh",disable:"disable",enable:"enable",reset:"reset"},function(e,t){r.prototype[e]=function(){return this.request(t,arguments)}}),o.extend(r.prototype,{state:"pending",_init:function(e){var t=this
t.request("init",e,function(){t.state="ready",t.trigger("ready")})},option:function(e,t){var i=this.options
if(!(arguments.length>1))return e?i[e]:i
o.isPlainObject(t)&&o.isPlainObject(i[e])?o.extend(i[e],t):i[e]=t},getStats:function(){var e=this.request("get-stats")
return e?{successNum:e.numOfSuccess,progressNum:e.numOfProgress,cancelNum:e.numOfCancel,invalidNum:e.numOfInvalid,uploadFailNum:e.numOfUploadFailed,queueNum:e.numOfQueue,interruptNum:e.numofInterrupt}:{}},trigger:function(e){var t=[].slice.call(arguments,1),i=this.options,r="on"+e.substring(0,1).toUpperCase()+e.substring(1)
return!(!1===n.trigger.apply(this,arguments)||o.isFunction(i[r])&&!1===i[r].apply(this,t)||o.isFunction(this[r])&&!1===this[r].apply(this,t)||!1===n.trigger.apply(n,[this,e].concat(t)))},destroy:function(){this.request("destroy",arguments),this.off()},request:s.noop}),s.create=r.create=function(e){return new r(e)},s.Uploader=r,r})
define("3rd/webuploader/mediator.js",["3rd/webuploader/base.js"],function(t,n,e){function i(t,n,e,i){return u.grep(t,function(t){return t&&(!n||t.e===n)&&(!e||t.cb===e||t.cb._cb===e)&&(!i||t.ctx===i)})}function r(t,n,e){u.each((t||"").split(f),function(t,i){e(i,n)})}function s(t,n){for(var e,i=!1,r=-1,s=t.length;++r<s;)if(!1===(e=t[r]).cb.apply(e.ctx2,n)){i=!0
break}return!i}var c,u=t("3rd/webuploader/base.js").$,o=[].slice,f=/\s+/
return c={on:function(t,n,e){var i,s=this
return n?(i=this._events||(this._events=[]),r(t,n,function(t,n){var r={e:t}
r.cb=n,r.ctx=e,r.ctx2=e||s,r.id=i.length,i.push(r)}),this):this},once:function(t,n,e){var i=this
return n?(r(t,n,function(t,n){var r=function(){return i.off(t,r),n.apply(e||i,arguments)}
r._cb=n,i.on(t,r,e)}),i):i},off:function(t,n,e){var s=this._events
return s?t||n||e?(r(t,n,function(t,n){u.each(i(s,t,n,e),function(){delete s[this.id]})}),this):(this._events=[],this):this},trigger:function(t){var n,e,r
return this._events&&t?(n=o.call(arguments,1),e=i(this._events,t),r=i(this._events,"all"),s(e,n)&&s(r,arguments)):this}},u.extend({installTo:function(t){return u.extend(t,c)}},c)})
define("3rd/webuploader/lib/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/file.js","3rd/webuploader/lib/image.js"],function(e,i,t){function r(e){if(e=this.options=l.extend({},r.options,e),e.container=l(e.id),!e.container.length)throw new Error('_("按钮指定错误")')
e.button=e.container,o.call(this,"FilePicker",!0)}var n=e("3rd/webuploader/base.js"),o=e("3rd/webuploader/runtime/client.js"),s=e("3rd/webuploader/lib/file.js"),a=e("3rd/webuploader/lib/image.js"),l=n.$
return r.options={button:null,container:null,label:null,innerHTML:null,multiple:!0,accept:null},n.inherits(o,{constructor:r,init:function(){var e=this,i=e.options,t=i.button
t.addClass("webuploader-pick"),e.on("all",function(r){var n,o
switch(r){case"mouseenter":t.addClass("webuploader-pick-hover")
break
case"mouseleave":t.removeClass("webuploader-pick-hover")
break
case"change":n=e.exec("getFiles"),o=0,n=l.map(n,function(t){if(t=new s(e.getRuid(),t),t._refer=i.container,i.imageSize&&~"image/jpeg,image/jpg,image/png,image/bmp,image/gif".indexOf(t.type)){var r=new a(i.compress||i.resize)
r.on("load",function(){var s=r.info()
t.width=s.width,t.height=s.height,++o==n.length&&e.trigger("select",n,i.container)}),r.on("error",function(){++o==n.length&&e.trigger("select",n,i.container)}),r.loadFromBlob(t)}else o++
return t}),o==n.length&&e.trigger("select",n,i.container)}}),e.connectRuntime(i,function(){e.refresh(),e.exec("init",i),e.trigger("ready")}),this._resizeHandler=n.bindFn(this.refresh,this),l(window).on("resize",this._resizeHandler),setInterval(function(){e.refresh()},1e3)},refresh:function(){var e=this.getRuntime().getContainer(),i=this.options.button,t=i.outerWidth?i.outerWidth():i.width(),r=i.outerHeight?i.outerHeight():i.height(),n=i.offset()
try{i.is(":visible")||(t+=parseInt(i.css("min-width"))||0)}catch(e){}t&&r&&e.css({bottom:"auto",right:"auto",width:t+"px",height:r+"px"}).offset(n)},enable:function(){this.options.button.removeClass("webuploader-pick-disable"),this.refresh()},disable:function(){var e=this.options.button
this.getRuntime().getContainer().css({top:"-99999px"}),e.addClass("webuploader-pick-disable")},destroy:function(){var e=this.options.button
l(window).off("resize",this._resizeHandler),e.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick")}}),r})
define("3rd/webuploader/runtime/client.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/runtime/runtime.js"],function(e,t,n){function r(e,t){var n,r=o.Deferred()
this.uid=o.guid("client_"),this.runtimeReady=function(e){return r.done(e)},this.connectRuntime=function(e,u){if(n)throw new Error("already connected!")
return r.done(u),"string"==typeof e&&i.get(e)&&(n=i.get(e)),(n=n||i.get(null,t))?(o.$.extend(n.options,e),n.__promise.then(r.resolve),n.__client++):((n=d.create(e,e.runtimeOrder)).__promise=r.promise(),n.once("ready",r.resolve),n.init(),i.add(n),n.__client=1),t&&(n.__standalone=t),n},this.getRuntime=function(){return n},this.disconnectRuntime=function(){n&&(n.__client--,n.__client<=0&&(i.remove(n),delete n.__promise,n.destroy()),n=null)},this.exec=function(){if(n){var t=o.slice(arguments)
return e&&t.unshift(e),n.exec.apply(this,t)}},this.getRuid=function(){return n&&n.uid},this.destroy=function(e){return function(){e&&e.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()}}(this.destroy)}var i,o=e("3rd/webuploader/base.js"),u=e("3rd/webuploader/mediator.js"),d=e("3rd/webuploader/runtime/runtime.js")
return i=function(){var e={}
return{add:function(t){e[t.uid]=t},get:function(t,n){var r
if(t)return e[t]
for(r in e)if(!n||!e[r].__standalone)return e[r]
return null},remove:function(t){delete e[t.uid]}}}(),u.installTo(r.prototype),r})
define("3rd/webuploader/runtime/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,n){function r(t){this.options=a.extend({container:document.body},t),this.uid=o.guid("rt_")}var o=t("3rd/webuploader/base.js"),i=t("3rd/webuploader/mediator.js"),a=o.$,s={},d=function(t){for(var e in t)if(t.hasOwnProperty(e))return e
return null}
return a.extend(r.prototype,{getContainer:function(){var t,e,n=this.options
return this._container?this._container:(t=a(n.container||document.body).parent(),(e=a(document.createElement("div"))).attr("id","rt_"+this.uid),e.css({position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),t.append(e),t.addClass("webuploader-container"),this._container=e,this._parent=t,e)},init:o.noop,exec:o.noop,destroy:function(){this._container&&this._container.remove(),this._parent&&this._parent.removeClass("webuploader-container"),this.off()}}),r.orders="html5,flash",r.addRuntime=function(t,e){s[t]=e},r.hasRuntime=function(t){return!!(t?s[t]:d(s))},r.create=function(t,e){var n
if(e=e||r.orders,a.each(e.split(/\s*,\s*/g),function(){if(s[this])return n=this,!1}),!(n=n||d(s)))throw new Error("Runtime Error")
return new s[n](t)},i.installTo(r.prototype),r})
define("3rd/webuploader/lib/file.js",["3rd/webuploader/base.js","3rd/webuploader/lib/blob.js"],function(e,t,a){var i=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/lib/blob.js"),o=1,s=/\.([^.]+)$/
return i.inherits(r,function(e,t){var a
this.name=t.name||"untitled"+o++,!(a=s.exec(t.name)?RegExp.$1.toLowerCase():"")&&t.type&&(a=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(t.type)?RegExp.$1.toLowerCase():"",this.name+="."+a),this.ext=a,this.lastModifiedDate=t.lastModifiedDate||(new Date).toLocaleString(),r.apply(this,arguments)})})
define("3rd/webuploader/lib/blob.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js"],function(e,t,i){function s(e,t){this.source=t,this.ruid=e,this.size=t.size||0,!t.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?this.type="image/"+("jpg"===this.ext?"jpeg":this.ext):this.type=t.type||"application/octet-stream",n.call(this,"Blob"),this.uid=t.uid||this.uid,e&&this.connectRuntime(e)}var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/client.js")
return r.inherits(n,{constructor:s,slice:function(e,t){return this.exec("slice",e,t)},getSource:function(){return this.source}}),s})
define("3rd/webuploader/lib/image.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/blob.js"],function(e,t,i){function n(e){this.options=a.extend({},n.options,e),r.call(this,"Image"),this.on("load",function(){this._info=this.exec("info"),this._meta=this.exec("meta")})}var o=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/runtime/client.js"),s=e("3rd/webuploader/lib/blob.js"),a=o.$
return n.options={quality:90,crop:!1,preserveHeaders:!1,allowMagnify:!1},o.inherits(r,{constructor:n,info:function(e){return e?(this._info=e,this):this._info},meta:function(e){return e?(this._meta=e,this):this._meta},loadFromBlob:function(e){var t=this,i=e.getRuid()
this.connectRuntime(i,function(){t.exec("init",t.options),t.exec("loadFromBlob",e)})},resize:function(){var e=o.slice(arguments)
return this.exec.apply(this,["resize"].concat(e))},crop:function(){var e=o.slice(arguments)
return this.exec.apply(this,["crop"].concat(e))},getAsDataUrl:function(e){return this.exec("getAsDataUrl",e)},getAsBlob:function(e,t){var i=t?this.exec("getAsBlob",e,t):this.exec("getAsBlob",e)
return new s(this.getRuid(),i)}}),n})
define("3rd/webuploader/widgets/widget.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js"],function(e,n,t){function r(e){this.owner=e,this.options=e.options}var i=e("3rd/webuploader/base.js"),o=e("3rd/webuploader/uploader.js"),s=i.$,p=o.prototype._init,u=o.prototype.destroy,a={},d=[]
return s.extend(r.prototype,{init:i.noop,invoke:function(e,n){var t=this.responseMap
return t&&e in t&&t[e]in this&&s.isFunction(this[t[e]])?this[t[e]].apply(this,n):a},request:function(){return this.owner.request.apply(this.owner,arguments)}}),s.extend(o.prototype,{_init:function(){var e=this,n=e._widgets=[],t=e.options.disableWidgets||""
return s.each(d,function(r,i){(!t||!~t.indexOf(i._name))&&n.push(new i(e))}),p.apply(e,arguments)},request:function(e,n,t){var r,o,p,u=0,d=this._widgets,h=d&&d.length,l=[],f=[]
for(n=function(e){if(!e)return!1
var n=e.length,t=s.type(e)
return!(1!==e.nodeType||!n)||"array"===t||"function"!==t&&"string"!==t&&(0===n||"number"==typeof n&&n>0&&n-1 in e)}(n)?n:[n];u<h;u++)(r=d[u].invoke(e,n))!==a&&(i.isPromise(r)?f.push(r):l.push(r))
return t||f.length?(o=i.when.apply(i,f),p=o.pipe?"pipe":"then",o[p](function(){var e=i.Deferred(),n=arguments
return 1===n.length&&(n=n[0]),setTimeout(function(){e.resolve(n)},1),e.promise()})[t?p:"done"](t||i.noop)):l[0]},destroy:function(){u.apply(this,arguments),this._widgets=null}}),o.register=r.register=function(e,n){var t,o={init:"init",destroy:"destroy",name:"anonymous"}
return 1===arguments.length?(n=e,s.each(n,function(e){"_"!==e[0]&&"name"!==e?o[e.replace(/[A-Z]/g,"-$&").toLowerCase()]=e:"name"===e&&(o.name=n.name)})):o=s.extend(o,e),n.responseMap=o,t=i.inherits(r,n),t._name=o.name,d.push(t),t},o.unRegister=r.unRegister=function(e){if(e&&"anonymous"!==e)for(var n=d.length;n--;)d[n]._name===e&&d.splice(n,1)},r})
define("3rd/webuploader/widgets/queue.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/queue.js","3rd/webuploader/file.js","3rd/webuploader/lib/file.js","3rd/webuploader/runtime/client.js","3rd/webuploader/widgets/widget.js"],function(e,t,i){var r=e("3rd/webuploader/base.js"),u=e("3rd/webuploader/uploader.js"),s=e("3rd/webuploader/queue.js"),n=e("3rd/webuploader/file.js"),a=e("3rd/webuploader/lib/file.js"),l=e("3rd/webuploader/runtime/client.js")
e("3rd/webuploader/widgets/widget.js")
var o=r.$,d=n.Status
return u.register({name:"queue",init:function(e){var t,i,u,n,a,d,c,p=this
if(o.isPlainObject(e.accept)&&(e.accept=[e.accept]),e.accept){for(a=[],u=0,i=e.accept.length;u<i;u++)(n=e.accept[u].extensions)&&a.push(n)
a.length&&(d="\\."+a.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),p.accept=new RegExp(d,"i")}if(p.queue=new s,p.stats=p.queue.stats,"html5"===this.request("predict-runtime-type"))return t=r.Deferred(),this.placeholder=c=new l("Placeholder"),c.connectRuntime({runtimeOrder:"html5"},function(){p._ruid=c.getRuid(),t.resolve()}),t.promise()},_wrapFile:function(e){if(!(e instanceof n)){if(!(e instanceof a)){if(!this._ruid)throw new Error("Can't add external files.")
e=new a(this._ruid,e)}e=new n(e)}return e},acceptFile:function(e){return!(!e||!e.size||this.accept&&!this.accept.test(e.name))},_addFile:function(e){if(e=this._wrapFile(e),this.owner.trigger("beforeFileQueued",e)){if(this.acceptFile(e))return this.queue.append(e),this.owner.trigger("fileQueued",e),e
this.owner.trigger("error","Q_TYPE_DENIED",e)}},getFile:function(e){return this.queue.getFile(e)},addFile:function(e){var t=this
e.length||(e=[e]),e=o.map(e,function(e){return t._addFile(e)}),t.owner.trigger("filesQueued",e),t.options.auto&&setTimeout(function(){t.request("start-upload")},20)},getStats:function(){return this.stats},removeFile:function(e,t){e=e.id?e:this.queue.getFile(e),this.request("cancel-file",e),t&&this.queue.removeFile(e)},getFiles:function(){return this.queue.getFiles.apply(this.queue,arguments)},fetchFile:function(){return this.queue.fetch.apply(this.queue,arguments)},retry:function(e,t){var i,r,u
if(e)return(e=e.id?e:this.queue.getFile(e)).setStatus(d.QUEUED),void(t||this.request("start-upload"))
for(r=0,u=(i=this.queue.getFiles(d.ERROR)).length;r<u;r++)(e=i[r]).setStatus(d.QUEUED)
this.request("start-upload")},sortFiles:function(){return this.queue.sort.apply(this.queue,arguments)},reset:function(){this.owner.trigger("reset"),this.queue=new s,this.stats=this.queue.stats},destroy:function(){this.reset(),this.placeholder&&this.placeholder.destroy()}})})
define("3rd/webuploader/queue.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/file.js"],function(e,t,u){function n(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0,numofDeleted:0,numofInterrupt:0},this._queue=[],this._map={}}var s=e("3rd/webuploader/base.js"),a=e("3rd/webuploader/mediator.js"),r=e("3rd/webuploader/file.js"),i=s.$,o=r.Status
return i.extend(n.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,u,n=this._queue.length
for(e=e||o.QUEUED,t=0;t<n;t++)if(u=this._queue[t],e===u.getStatus())return u
return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),u=[],n=0,s=this._queue.length;n<s;n++)e=this._queue[n],t.length&&!~i.inArray(e.getStatus(),t)||u.push(e)
return u},removeFile:function(e){this._map[e.id]&&(delete this._map[e.id],e.destroy(),this.stats.numofDeleted++)},_fileAdded:function(e){var t=this
this._map[e.id]||(this._map[e.id]=e,e.on("statuschange",function(e,u){t._onFileStatusChange(e,u)}))},_onFileStatusChange:function(e,t){var u=this.stats
switch(t){case o.PROGRESS:u.numOfProgress--
break
case o.QUEUED:u.numOfQueue--
break
case o.ERROR:u.numOfUploadFailed--
break
case o.INVALID:u.numOfInvalid--
break
case o.INTERRUPT:u.numofInterrupt--}switch(e){case o.QUEUED:u.numOfQueue++
break
case o.PROGRESS:u.numOfProgress++
break
case o.ERROR:u.numOfUploadFailed++
break
case o.COMPLETE:u.numOfSuccess++
break
case o.CANCELLED:u.numOfCancel++
break
case o.INVALID:u.numOfInvalid++
break
case o.INTERRUPT:u.numofInterrupt++}}}),a.installTo(n.prototype),n})
define("3rd/webuploader/file.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,i){function s(t){this.name=t.name||"Untitled",this.size=t.size||0,this.width=t.width||-1,this.height=t.height||-1,this.type=t.type||"application/octet-stream",this.lastModifiedDate=t.lastModifiedDate||1*new Date,this.id=d+o++,this.ext=n.exec(this.name)?RegExp.$1:"",this.statusText="",h[this.id]=s.Status.INITED,this.source=t,this.loaded=0,this.on("error",function(t){this.setStatus(s.Status.ERROR,t)})}var r=t("3rd/webuploader/base.js"),a=t("3rd/webuploader/mediator.js"),d="WU_FILE_",o=0,n=/\.([^.]+)$/,h={}
return r.$.extend(s.prototype,{setStatus:function(t,e){var i=h[this.id]
void 0!==e&&(this.statusText=e),t!==i&&(h[this.id]=t,this.trigger("statuschange",t,i))},getStatus:function(){return h[this.id]},getSource:function(){return this.source},destroy:function(){this.off(),delete h[this.id]}}),a.installTo(s.prototype),s.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},s})
define("3rd/webuploader/widgets/runtime.js",["3rd/webuploader/uploader.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/widgets/widget.js"],function(e,r,t){var i=e("3rd/webuploader/uploader.js"),u=e("3rd/webuploader/runtime/runtime.js")
return e("3rd/webuploader/widgets/widget.js"),i.support=function(){return u.hasRuntime.apply(u,arguments)},i.register({name:"runtime",init:function(){if(!this.predictRuntimeType())throw Error("Runtime Error")},predictRuntimeType:function(){var e,r,t=this.options.runtimeOrder||u.orders,i=this.type
if(!i)for(e=0,r=(t=t.split(/\s*,\s*/g)).length;e<r;e++)if(u.hasRuntime(t[e])){this.type=i=t[e]
break}return i}})})
define("3rd/webuploader/widgets/upload.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/lib/transport.js","3rd/webuploader/widgets/widget.js"],function(t,e,r){var i=t("3rd/webuploader/base.js"),n=t("3rd/webuploader/uploader.js"),s=t("3rd/webuploader/file.js"),o=t("3rd/webuploader/lib/transport.js")
t("3rd/webuploader/widgets/widget.js")
var a=i.$,u=i.isPromise,l=s.Status
a.extend(n.options,{prepareNextFile:!1,chunked:!1,chunkSize:5242880,chunkRetry:2,threads:3,formData:{}}),n.register({name:"upload",init:function(){var t=this.owner,e=this
this.runing=!1,this.progress=!1,t.on("startUpload",function(){e.progress=!0}).on("uploadFinished",function(){e.progress=!1}),this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this.__tick=i.bindFn(this._tick,this),t.on("uploadComplete",function(t){t.blocks&&a.each(t.blocks,function(t,e){e.transport&&(e.transport.abort(),e.transport.destroy()),delete e.transport}),delete t.blocks,delete t.remaning})},reset:function(){this.request("stop-upload",!0),this.runing=!1,this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this._trigged=!1,this._promise=null},startUpload:function(t){var e=this
if(a.each(e.request("get-files",l.INVALID),function(){e.request("remove-file",this)}),t)if((t=t.id?t:e.request("get-file",t)).getStatus()===l.INTERRUPT)a.each(e.pool,function(e,r){r.file===t&&r.transport&&r.transport.send()}),t.setStatus(l.QUEUED)
else{if(t.getStatus()===l.PROGRESS)return
t.setStatus(l.QUEUED)}else a.each(e.request("get-files",[l.INITED]),function(){this.setStatus(l.QUEUED)})
if(!e.runing){e.runing=!0
var r=[]
a.each(e.pool,function(t,i){var n=i.file
n.getStatus()===l.INTERRUPT&&(r.push(n),e._trigged=!1,i.transport&&i.transport.send())})
for(;t=r.shift();)t.setStatus(l.PROGRESS)
t||a.each(e.request("get-files",l.INTERRUPT),function(){this.setStatus(l.PROGRESS)}),e._trigged=!1,i.nextTick(e.__tick),e.owner.trigger("startUpload")}},stopUpload:function(t,e){var r=this
if(!0===t&&(e=t,t=null),!1!==r.runing){if(t){if((t=t.id?t:r.request("get-file",t)).getStatus()!==l.PROGRESS&&t.getStatus()!==l.QUEUED)return
return t.setStatus(l.INTERRUPT),a.each(r.pool,function(e,i){i.file===t&&(i.transport&&i.transport.abort(),r._putback(i),r._popBlock(i))}),i.nextTick(r.__tick)}r.runing=!1,this._promise&&this._promise.file&&this._promise.file.setStatus(l.INTERRUPT),e&&a.each(r.pool,function(t,e){e.transport&&e.transport.abort(),e.file.setStatus(l.INTERRUPT)}),r.owner.trigger("stopUpload")}},cancelFile:function(t){(t=t.id?t:this.request("get-file",t)).blocks&&a.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),t.setStatus(l.CANCELLED),this.owner.trigger("fileDequeued",t)},isInProgress:function(){return!!this.progress},_getStats:function(){return this.request("get-stats")},skipFile:function(t,e){(t=t.id?t:this.request("get-file",t)).setStatus(e||l.COMPLETE),t.skipped=!0,t.blocks&&a.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),this.owner.trigger("uploadSkip",t)},_tick:function(){var t,e,r=this,n=r.options
if(r._promise)return r._promise.always(r.__tick)
r.pool.length<n.threads&&(e=r._nextBlock())?(r._trigged=!1,t=function(t){r._promise=null,t&&t.file&&r._startSend(t),i.nextTick(r.__tick)},r._promise=u(e)?e.always(t):t(e)):r.remaning||r._getStats().numOfQueue||r._getStats().numofInterrupt||(r.runing=!1,r._trigged||i.nextTick(function(){r.owner.trigger("uploadFinished",r._getStats())}),r._trigged=!0)},_putback:function(t){t.cuted.unshift(t),~this.stack.indexOf(t.cuted)||this.stack.unshift(t.cuted)},_getStack:function(){for(var t,e=0;t=this.stack[e++];){if(t.has()&&t.file.getStatus()===l.PROGRESS)return t;(!t.has()||t.file.getStatus()!==l.PROGRESS&&t.file.getStatus()!==l.INTERRUPT)&&this.stack.splice(--e,1)}return null},_nextBlock:function(){var t,e,r,i,n=this,s=n.options
return(t=this._getStack())?(s.prepareNextFile&&!n.pending.length&&n._prepareNextFile(),t.shift()):n.runing?(!n.pending.length&&n._getStats().numOfQueue&&n._prepareNextFile(),e=n.pending.shift(),r=function(e){return e?(t=function(t,e){var r,i,n=[],s=t.source.size,o=e?Math.ceil(s/e):1,a=0,u=0
for(i={file:t,has:function(){return!!n.length},shift:function(){return n.shift()},unshift:function(t){n.unshift(t)}};u<o;)r=Math.min(e,s-a),n.push({file:t,start:a,end:e?a+r:s,total:s,chunks:o,chunk:u++,cuted:i}),a+=r
return t.blocks=n.concat(),t.remaning=n.length,i}(e,s.chunked?s.chunkSize:0),n.stack.push(t),t.shift()):null},u(e)?(i=e.file,e=e[e.pipe?"pipe":"then"](r),e.file=i,e):r(e)):void 0},_prepareNextFile:function(){var t,e=this,r=e.request("fetch-file"),i=e.pending
r&&(t=e.request("before-send-file",r,function(){return r.getStatus()===l.PROGRESS||r.getStatus()===l.INTERRUPT?r:e._finishFile(r)}),e.owner.trigger("uploadStart",r),r.setStatus(l.PROGRESS),t.file=r,t.done(function(){var e=a.inArray(t,i)
~e&&i.splice(e,1,r)}),t.fail(function(t){var i=e.options.compress
r.setStatus(l.ERROR,t),"F_EXCEED_COMPRESS_SIZE"==t&&e.owner.trigger("error",t,i&&i.afterCompressSizeLimit,r),e.owner.trigger("uploadError",r,t),e.owner.trigger("uploadComplete",r)}),i.push(t))},_popBlock:function(t){var e=a.inArray(t,this.pool)
this.pool.splice(e,1),t.file.remaning--,this.remaning--},_startSend:function(t){var e=this,r=t.file
r.getStatus()===l.PROGRESS?(e.pool.push(t),e.remaning++,t.blob=1===t.chunks?r.source:r.source.slice(t.start,t.end),e.request("before-send",t,function(){r.getStatus()===l.PROGRESS?e._doSend(t):(e._popBlock(t),i.nextTick(e.__tick))}).fail(function(){1===r.remaning?e._finishFile(r).always(function(){t.percentage=1,e._popBlock(t),e.owner.trigger("uploadComplete",r),i.nextTick(e.__tick)}):(t.percentage=1,e.updateFileProgress(r),e._popBlock(t),i.nextTick(e.__tick))})):r.getStatus()===l.INTERRUPT&&e._putback(t)},_doSend:function(t){var e,r,n=this,s=n.owner,u=n.options,p=t.file,c=new o(u),d=a.extend({},u.formData),f=a.extend({},u.headers)
t.transport=c,c.on("destroy",function(){delete t.transport,n._popBlock(t),i.nextTick(n.__tick)}),c.on("progress",function(e){t.percentage=e,n.updateFileProgress(p)}),e=function(e){var i
return r=c.getResponseAsJson()||{},r._raw=c.getResponse(),i=function(t){e=t},s.trigger("uploadAccept",t,r,i)||(e=e||"server"),e},c.on("error",function(r,i){t.retried=t.retried||0,t.chunks>1&&~"http,abort".indexOf(r)&&t.retried<u.chunkRetry?(t.retried++,c.send()):(i||"server"!==r||(r=e(r)),p.setStatus(l.ERROR,r),s.trigger("uploadError",p,r),s.trigger("uploadComplete",p))}),c.on("load",function(){var t;(t=e())?c.trigger("error",t,!0):1===p.remaning?n._finishFile(p,r):c.destroy()}),d=a.extend(d,{id:p.id,name:p.name,type:p.type,lastModifiedDate:p.lastModifiedDate,size:p.size}),t.chunks>1&&a.extend(d,{chunks:t.chunks,chunk:t.chunk}),s.trigger("uploadBeforeSend",t,d,f),c.appendBlob(u.fileVal,t.blob,p.name),c.append(d),c.setRequestHeader(f),c.send()},_finishFile:function(t,e,r){var i=this,n=this.owner
return n.request("after-send-file",arguments,function(){t.setStatus(l.COMPLETE),n.trigger("uploadSuccess",t,e,i._getStats(),r)}).fail(function(e){t.getStatus()===l.PROGRESS&&t.setStatus(l.ERROR,e),n.trigger("uploadError",t,e)}).always(function(){n.trigger("uploadComplete",t)})},updateFileProgress:function(t){var e=0,r=0
t.blocks&&(a.each(t.blocks,function(t,e){r+=(e.percentage||0)*(e.end-e.start)}),e=r/t.size,this.owner.trigger("uploadProgress",t,e||0))}})})
