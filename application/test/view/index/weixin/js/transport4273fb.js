define("3rd/webuploader/lib/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/mediator.js"],function(e,t,i){function o(e){var t=this
e=t.options=a.extend(!0,{},o.options,e||{}),n.call(this,"Transport"),this._blob=null,this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),this.on("load error",function(){t.trigger("progress",1),clearTimeout(t._timer)})}var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/client.js"),s=e("3rd/webuploader/mediator.js"),a=r.$
return o.options={server:"",method:"POST",withCredentials:!1,fileVal:"file",timeout:12e4,formData:{},headers:{},sendAsBinary:!1},a.extend(o.prototype,{appendBlob:function(e,t,i){var o=this,r=o.options
o.getRuid()&&o.disconnectRuntime(),o.connectRuntime(t.ruid,function(){o.exec("init")}),o._blob=t,r.fileVal=e||r.fileVal,r.filename=i||r.filename},append:function(e,t){"object"==typeof e?a.extend(this._formData,e):this._formData[e]=t},setRequestHeader:function(e,t){"object"==typeof e?a.extend(this._headers,e):this._headers[e]=t},send:function(e){this.exec("send",e),this._timeout()},abort:function(){return clearTimeout(this._timer),this.exec("abort")},destroy:function(){this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()},getResponse:function(){return this.exec("getResponse")},getResponseAsJson:function(){return this.exec("getResponseAsJson")},getStatus:function(){return this.exec("getStatus")},_timeout:function(){var e=this,t=e.options.timeout
t&&(clearTimeout(e._timer),e._timer=setTimeout(function(){e.abort(),e.trigger("error","timeout")},t))}}),s.installTo(o.prototype),o})
define("3rd/webuploader/widgets/validator.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/widgets/widget.js"],function(e,i,t){var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/uploader.js"),o=e("3rd/webuploader/file.js")
e("3rd/webuploader/widgets/widget.js")
var u,a=r.$,s={}
return u={addValidator:function(e,i){s[e]=i},removeValidator:function(e){delete s[e]}},n.register({name:"validator",init:function(){var e=this
r.nextTick(function(){a.each(s,function(){this.call(e.owner)})})}}),u.addValidator("fileNumLimit",function(){var e=this.options,i=0,t=parseInt(e.fileNumLimit,10),r=!0
t&&(this.on("beforeFileQueued",function(e){return i>=t&&r&&(r=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",t,e),setTimeout(function(){r=!0},1)),!(i>=t)}),this.on("fileQueued",function(){i++}),this.on("fileDequeued",function(){i--}),this.on("reset",function(){i=0}))}),u.addValidator("fileSizeLimit",function(){var e=this.options,i=0,t=parseInt(e.fileSizeLimit,10),r=!0
t&&(this.on("beforeFileQueued",function(e){var n=i+e.size>t
return n&&r&&(r=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",t,e),setTimeout(function(){r=!0},1)),!n}),this.on("fileQueued",function(e){i+=e.size}),this.on("fileDequeued",function(e){i-=e.size}),this.on("reset",function(){i=0}))}),u.addValidator("fileSingleSizeLimit",function(){var e=this.options.fileSingleSizeLimit
e&&this.on("beforeFileQueued",function(i){if(i.size>e)return i.setStatus(o.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",e,i),!1})}),u.addValidator("duplicate",function(){var e={}
this.options.duplicate||(this.on("beforeFileQueued",function(i){var t=i.__hash||(i.__hash=function(e){for(var i=0,t=0,r=e.length;t<r;t++)i=e.charCodeAt(t)+(i<<6)+(i<<16)-i
return i}(i.name+i.size+i.lastModifiedDate))
if(e[t])return this.trigger("error","F_DUPLICATE",i),!1}),this.on("fileQueued",function(i){var t=i.__hash
t&&(e[t]=!0)}),this.on("fileDequeued",function(i){var t=i.__hash
t&&delete e[t]}),this.on("reset",function(){e={}}))}),u})
define("3rd/webuploader/widgets/image.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/image.js","3rd/webuploader/widgets/widget.js"],function(e,i,t){function o(e,i,t,r){var n,a
return e*=t.quality/100,n=s.support("html5")?i.getAsBlob(t.type,0|e):i.getAsBlob(t.type),console.log(n.size,0|e),a=r.size,n.size<a&&t.afterCompressSizeLimit&&n.size>t.afterCompressSizeLimit&&e>40&&(r.size=n.size,e=o(e,i,t,r).quality),{quality:e,blob:n}}var r=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/uploader.js"),n=e("3rd/webuploader/lib/image.js")
e("3rd/webuploader/widgets/widget.js")
var a,m=r.$
return a=function(e){var i=0,t=[],o=function(){for(var e;t.length&&i<5242880;)e=t.shift(),i+=e[0],e[1]()}
return function(e,r,s){t.push([r,s]),e.once("destroy",function(){i-=r,setTimeout(o,1)}),setTimeout(o,1)}}(),m.extend(s.options,{thumb:{width:110,height:110,quality:70,allowMagnify:!0,crop:!0,preserveHeaders:!1,type:"image/jpeg"},compress:{width:1600,height:1600,quality:90,allowMagnify:!1,crop:!1,preserveHeaders:!0}}),s.register({name:"image",makeThumb:function(e,i,t,o){var r,s;(e=this.request("get-file",e)).type.match(/^image/)?(r=m.extend({},this.options.thumb),m.isPlainObject(t)&&(r=m.extend(r,t),t=null),t=t||r.width,o=o||r.height,(s=new n(r)).once("load",function(){e._info=e._info||s.info(),e._meta=e._meta||s.meta(),t<=1&&t>0&&(t=e._info.width*t),o<=1&&o>0&&(o=e._info.height*o),s.resize(t,o)}),s.once("complete",function(){i(!1,s.getAsDataUrl(r.type)),s.destroy()}),s.once("error",function(e){i(e||!0),s.destroy()}),a(s,e.source.size,function(){e._info&&s.info(e._info),e._meta&&s.meta(e._meta),s.loadFromBlob(e.source)})):i(!0)},beforeSendFile:function(e){var i,t,s=this.options.compress||this.options.resize,a=s&&s.compressSize||0
s&&s.noCompressIfLarger
return e=this.request("get-file",e),s&&~"image/gif".indexOf(e.type)&&e.size>s.afterCompressSizeLimit?(t=r.Deferred(),setTimeout(function(){t.reject("F_EXCEED_COMPRESS_SIZE")},0),t.promise()):!s||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(e.type)||e.size<a||e._compressed?void 0:(s=m.extend({},s),t=r.Deferred(),i=new n(s),t.always(function(){i.destroy(),i=null}),i.once("error",t.reject),i.once("load",function(){var t=s.width,o=s.height
e._info=e._info||i.info(),e._meta=e._meta||i.meta(),t<=1&&t>0&&(t=e._info.width*t),o<=1&&o>0&&(o=e._info.height*o),s.resizeSize&&e.size<s.resizeSize&&(!s.maxResolution||e._info.width*e._info.height<s.maxResolution)?i.resize(e._info.width,e._info.height):i.resize(t,o)}),i.once("complete",function(){var r,n
try{n=e.size,r=o(100,i,s,{source:e.source,size:e.size}).blob,(!s.noCompressIfLarger||r.size<n)&&(e.source=r,e.size=r.size,e.trigger("resize",r.size,n)),e._compressed=!0,e.size>s.afterCompressSizeLimit?t.reject("F_EXCEED_COMPRESS_SIZE"):t.resolve()}catch(i){e.size>s.afterCompressSizeLimit?t.reject("F_EXCEED_COMPRESS_SIZE"):t.resolve()}}),e._info&&i.info(e._info),e._meta&&i.meta(e._meta),i.loadFromBlob(e.source),t.promise())}})})
define("3rd/webuploader/runtime/html5/blob.js",["3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/lib/blob.js"],function(e,r,l){var i=e("3rd/webuploader/runtime/html5/runtime.js"),t=e("3rd/webuploader/lib/blob.js")
return i.register("Blob",{slice:function(e,r){var l=this.owner.source
return l=(l.slice||l.webkitSlice||l.mozSlice).call(l,e,r),new t(this.getRuid(),l)}})})
define("3rd/webuploader/runtime/html5/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/runtime/compbase.js"],function(e,r,t){function i(){var e={},r=this,t=this.destroy
u.apply(r,arguments),r.type=o,r.exec=function(t,i){var u,d=this.uid,o=n.slice(arguments,2)
if(s[t]&&(u=e[d]=e[d]||new s[t](this,r))[i])return u[i].apply(u,o)},r.destroy=function(){return t&&t.apply(this,arguments)}}var n=e("3rd/webuploader/base.js"),u=e("3rd/webuploader/runtime/runtime.js"),d=e("3rd/webuploader/runtime/compbase.js"),o="html5",s={}
return n.inherits(u,{constructor:i,init:function(){var e=this
setTimeout(function(){e.trigger("ready")},1)}}),i.register=function(e,r){return s[e]=n.inherits(d,r)},window.Blob&&window.FileReader&&window.DataView&&u.addRuntime(o,i),i})
define("3rd/webuploader/runtime/compbase.js",[],function(t,n,i){return function(t,n){this.owner=t,this.options=t.options,this.getRuntime=function(){return n},this.getRuid=function(){return n.uid},this.trigger=function(){return t.trigger.apply(t,arguments)}}})
define("3rd/webuploader/runtime/html5/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/runtime/html5/util.js"],function(e,t,i){var n=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/runtime/html5/runtime.js"),l=(e("3rd/webuploader/runtime/html5/util.js"),n.$)
return r.register("FilePicker",{init:function(){var e,t,i,n,r=this.getRuntime().getContainer(),a=this,o=a.owner,u=a.options,c=this.label=l(document.createElement("label")),s=this.input=l(document.createElement("input"))
if(s.attr("type","file"),s.attr("name",u.name),s.css("display","none"),c.on("click",function(){s.trigger("click")}),c.css({opacity:0,width:"100%",height:"100%",display:"block",cursor:"pointer",background:"#ffffff"}),u.multiple&&s.attr("multiple","multiple"),u.accept&&u.accept.length>0){for(e=[],t=0,i=u.accept.length;t<i;t++)e.push(u.accept[t].mimeTypes)
s.attr("accept",e.join(","))}r.append(s),r.append(c),n=function(e){o.trigger(e.type)},s.on("change",function(e){var t,i=arguments.callee
a.files=e.target.files,(t=this.cloneNode(!0)).value=null,this.parentNode.replaceChild(t,this),s.off(),s=l(t).on("change",i).on("mouseenter mouseleave",n),o.trigger("change")}),c.on("mouseenter mouseleave",n)},getFiles:function(){return this.files},destroy:function(){this.input.off(),this.label.off()}})})
define("3rd/webuploader/runtime/html5/util.js",["3rd/webuploader/base.js"],function(e,r,t){var n=e("3rd/webuploader/base.js"),o=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL,a=n.noop,i=a
return o&&(a=function(){return o.createObjectURL.apply(o,arguments)},i=function(){return o.revokeObjectURL.apply(o,arguments)}),{createObjectURL:a,revokeObjectURL:i,dataURL2Blob:function(e){var r,t,n,o,a,i
for(r=~(i=e.split(","))[0].indexOf("base64")?atob(i[1]):decodeURIComponent(i[1]),n=new ArrayBuffer(r.length),t=new Uint8Array(n),o=0;o<r.length;o++)t[o]=r.charCodeAt(o)
return a=i[0].split(":")[1].split(";")[0],this.arrayBufferToBlob(n,a)},dataURL2ArrayBuffer:function(e){var r,t,n,o
for(r=~(o=e.split(","))[0].indexOf("base64")?atob(o[1]):decodeURIComponent(o[1]),t=new Uint8Array(r.length),n=0;n<r.length;n++)t[n]=r.charCodeAt(n)
return t.buffer},arrayBufferToBlob:function(e,r){var t,n=window.BlobBuilder||window.WebKitBlobBuilder
return n?((t=new n).append(e),t.getBlob(r)):new Blob([e],r?{type:r}:{})},canvasToDataUrl:function(e,r,t){return e.toDataURL(r,t/100)},parseMeta:function(e,r){r(!1,{})},updateImageHead:function(e){return e}}})
define("3rd/webuploader/runtime/html5/imagemeta/exif.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/imagemeta.js"],function(e,t,i){var a=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/html5/imagemeta.js"),r={}
return r.ExifMap=function(){return this},r.ExifMap.prototype.map={Orientation:274},r.ExifMap.prototype.get=function(e){return this[e]||this[this.map[e]]},r.exifTagTypes={1:{getValue:function(e,t){return e.getUint8(t)},size:1},2:{getValue:function(e,t){return String.fromCharCode(e.getUint8(t))},size:1,ascii:!0},3:{getValue:function(e,t,i){return e.getUint16(t,i)},size:2},4:{getValue:function(e,t,i){return e.getUint32(t,i)},size:4},5:{getValue:function(e,t,i){return e.getUint32(t,i)/e.getUint32(t+4,i)},size:8},9:{getValue:function(e,t,i){return e.getInt32(t,i)},size:4},10:{getValue:function(e,t,i){return e.getInt32(t,i)/e.getInt32(t+4,i)},size:8}},r.exifTagTypes[7]=r.exifTagTypes[1],r.getExifValue=function(e,t,i,n,g,f){var s,u,l,o,d,p,x=r.exifTagTypes[n]
if(x){if(s=x.size*g,!((u=s>4?t+e.getUint32(i+8,f):i+8)+s>e.byteLength)){if(1===g)return x.getValue(e,u,f)
for(l=[],o=0;o<g;o+=1)l[o]=x.getValue(e,u+o*x.size,f)
if(x.ascii){for(d="",o=0;o<l.length&&"\0"!==(p=l[o]);o+=1)d+=p
return d}return l}a.log("Invalid Exif data: Invalid data offset.")}else a.log("Invalid Exif data: Invalid tag type.")},r.parseExifTag=function(e,t,i,a,n){var g=e.getUint16(i,a)
n.exif[g]=r.getExifValue(e,t,i,e.getUint16(i+2,a),e.getUint32(i+4,a),a)},r.parseExifTags=function(e,t,i,n,r){var g,f,s
if(i+6>e.byteLength)a.log("Invalid Exif data: Invalid directory offset.")
else{if(g=e.getUint16(i,n),!((f=i+2+12*g)+4>e.byteLength)){for(s=0;s<g;s+=1)this.parseExifTag(e,t,i+2+12*s,n,r)
return e.getUint32(f,n)}a.log("Invalid Exif data: Invalid directory size.")}},r.parseExifData=function(e,t,i,n){var g,f,s=t+10
if(1165519206===e.getUint32(t+4))if(s+8>e.byteLength)a.log("Invalid Exif data: Invalid segment size.")
else if(0===e.getUint16(t+8)){switch(e.getUint16(s)){case 18761:g=!0
break
case 19789:g=!1
break
default:return void a.log("Invalid Exif data: Invalid byte alignment marker.")}42===e.getUint16(s+2,g)?(f=e.getUint32(s+4,g),n.exif=new r.ExifMap,f=r.parseExifTags(e,s,s+f,g,n)):a.log("Invalid Exif data: Missing TIFF marker.")}else a.log("Invalid Exif data: Missing byte alignment offset.")},n.parsers[65505].push(r.parseExifData),r})
define("3rd/webuploader/runtime/html5/imagemeta.js",["3rd/webuploader/runtime/html5/util.js"],function(e,a,r){var t,n=e("3rd/webuploader/runtime/html5/util.js")
return t={parsers:{65505:[]},maxMetaDataSize:262144,parse:function(e,a){var r=this,t=new FileReader
t.onload=function(){a(!1,r._parse(this.result)),t=t.onload=t.onerror=null},t.onerror=function(e){a(e.message),t=t.onload=t.onerror=null},e=e.slice(0,r.maxMetaDataSize),t.readAsArrayBuffer(e.getSource())},_parse:function(e,a){if(!(e.byteLength<6)){var r,n,i,g,s=new DataView(e),u=2,l=s.byteLength-4,m=u,o={}
if(65496===s.getUint16(0)){for(;u<l&&((r=s.getUint16(u))>=65504&&r<=65519||65534===r)&&(n=s.getUint16(u+2)+2,!(u+n>s.byteLength));){if(i=t.parsers[r],!a&&i)for(g=0;g<i.length;g+=1)i[g].call(t,s,u,n,o)
m=u+=n}m>6&&(e.slice?o.imageHead=e.slice(2,m):o.imageHead=new Uint8Array(e).subarray(2,m))}switch(s.getUint16(0)){case 65496:o.imageType="image/jpeg"
break
case 35152:o.imageType="image/png"
break
case 16973:o.imageType="image/bmp"
break
case 18249:70==s.getUint8(2)&&(o.imageType="image/gif")}return o}},updateImageHead:function(e,a){var r,t,n,i=this._parse(e,!0)
return n=2,i.imageHead&&(n=2+i.imageHead.byteLength),t=e.slice?e.slice(n):new Uint8Array(e).subarray(n),r=new Uint8Array(a.byteLength+2+t.byteLength),r[0]=255,r[1]=216,r.set(new Uint8Array(a),2),r.set(new Uint8Array(t),a.byteLength+2),r.buffer}},n.parseMeta=function(){return t.parse.apply(t,arguments)},n.updateImageHead=function(){return t.updateImageHead.apply(t,arguments)},t})
define("3rd/webuploader/runtime/html5/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js"],function(e,t,r){var s=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/html5/runtime.js"),a=s.noop,o=s.$,i=1
return n.register("Transport",{init:function(){this._status=0,this._response=null},send:function(){var e,t,r,n=this.owner,a=this.options,u=this._initAjax(),d=n._blob,p=a.server
p+="&seq="+i++,a.sendAsBinary?(p+=(/\?/.test(p)?"&":"?")+o.param(n._formData),t=d.getSource()):(e=new FormData,o.each(n._formData,function(t,r){e.append(t,r)}),e.append(a.fileVal,d.getSource(),a.filename||n._formData.name||"")),a.withCredentials&&"withCredentials"in u?(u.open(a.method,p,!0),u.withCredentials=!0):u.open(a.method,p),this._setRequestHeader(u,a.headers),t?(u.overrideMimeType&&u.overrideMimeType("application/octet-stream"),s.os.android?((r=new FileReader).onload=function(){u.send(this.result),r=r.onload=null},r.readAsArrayBuffer(t)):u.send(t)):u.send(e)},getResponse:function(){return this._response},getResponseAsJson:function(){return this._parseJson(this._response)},getStatus:function(){return this._status},abort:function(){var e=this._xhr
e&&(e.upload.onprogress=a,e.onreadystatechange=a,e.abort(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,t=new XMLHttpRequest
return!this.options.withCredentials||"withCredentials"in t||"undefined"==typeof XDomainRequest||(t=new XDomainRequest),t.upload.onprogress=function(t){var r=0
return t.lengthComputable&&(r=t.loaded/t.total),e.trigger("progress",r)},t.onreadystatechange=function(){if(4===t.readyState)return t.upload.onprogress=a,t.onreadystatechange=a,e._xhr=null,e._status=t.status,t.status>=200&&t.status<300?(e._response=t.responseText,e.trigger("load")):t.status>=500&&t.status<600?(e._response=t.responseText,e.trigger("error","server")):e.trigger("error",e._status?"http":"abort")},e._xhr=t,t},_setRequestHeader:function(e,t){o.each(t,function(t,r){e.setRequestHeader(t,r)})},_parseJson:function(e){var t
try{t=JSON.parse(e)}catch(e){t={}}return t}})})
define("3rd/webuploader/runtime/html5/image.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/html5/runtime.js","3rd/webuploader/runtime/html5/util.js"],function(t,e,a){var i=t("3rd/webuploader/base.js"),r=t("3rd/webuploader/runtime/html5/runtime.js"),n=t("3rd/webuploader/runtime/html5/util.js")
return r.register("Image",{modified:!1,init:function(){var t=this,e=new Image
e.onload=function(){t._info={type:t.type,width:this.width,height:this.height},t._metas||"image/jpeg"!==t.type?t.owner.trigger("load"):n.parseMeta(t._blob,function(e,a){t._metas=a
try{t._info.type=t._blob.type=t.type=a.imageType}catch(t){}t.owner.trigger("load")})},e.onerror=function(){t.owner.trigger("error")},t._img=e},loadFromBlob:function(t){var e=this._img
this._blob=t,this.type=t.type,e.src=n.createObjectURL(t.getSource()),this.owner.once("load",function(){n.revokeObjectURL(e.src)})},resize:function(t,e){var a=this._canvas||(this._canvas=document.createElement("canvas"))
this._resize(this._img,a,t,e),this._blob=null,this.modified=!0,this.owner.trigger("complete","resize")},crop:function(t,e,a,i,r){var n=this._canvas||(this._canvas=document.createElement("canvas")),s=this.options,o=this._img,h=o.naturalWidth,c=o.naturalHeight,l=this.getOrientation()
r=r||1,n.width=a,n.height=i,s.preserveHeaders||this._rotate2Orientaion(n,l),this._renderImageToCanvas(n,o,-t,-e,h*r,c*r),this._blob=null,this.modified=!0,this.owner.trigger("complete","crop")},getAsBlob:function(t,e){var a,i=this._blob,r=this.options
if(t=t||this.type,this.modified||this.type!==t){if(a=this._canvas,"image/jpeg"===t){if(i=n.canvasToDataUrl(a,t,e||r.quality),r.preserveHeaders&&this._metas&&this._metas.imageHead)return i=n.dataURL2ArrayBuffer(i),i=n.updateImageHead(i,this._metas.imageHead),i=n.arrayBufferToBlob(i,t)}else i=n.canvasToDataUrl(a,t)
i=n.dataURL2Blob(i)}return i},getAsDataUrl:function(t){var e=this.options
return"image/jpeg"===(t=t||this.type)?n.canvasToDataUrl(this._canvas,t,e.quality):this._canvas.toDataURL(t)},getOrientation:function(){return this._metas&&this._metas.exif&&this._metas.exif.get("Orientation")||1},info:function(t){return t?(this._info=t,this):this._info},meta:function(t){return t?(this._meta=t,this):this._meta},destroy:function(){var t=this._canvas
this._img.onload=null,t&&(t.getContext("2d").clearRect(0,0,t.width,t.height),t.width=t.height=0,this._canvas=null),this._img.src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D",this._img=this._blob=null},_resize:function(t,e,a,i){var r,n,s,o,h,c=this.options,l=t.width,d=t.height,g=this.getOrientation()
~[5,6,7,8].indexOf(g)&&(a^=i,a^=i^=a),r=Math[c.crop?"max":"min"](a/l,i/d),c.allowMagnify||(r=Math.min(1,r)),n=l*r,s=d*r,c.crop?(e.width=a,e.height=i):(e.width=n,e.height=s),o=(e.width-n)/2,h=(e.height-s)/2,c.preserveHeaders||this._rotate2Orientaion(e,g),this._renderImageToCanvas(e,t,o,h,n,s)},_rotate2Orientaion:function(t,e){var a=t.width,i=t.height,r=t.getContext("2d")
switch(e){case 5:case 6:case 7:case 8:t.width=i,t.height=a}switch(e){case 2:r.translate(a,0),r.scale(-1,1)
break
case 3:r.translate(a,i),r.rotate(Math.PI)
break
case 4:r.translate(0,i),r.scale(1,-1)
break
case 5:r.rotate(.5*Math.PI),r.scale(1,-1)
break
case 6:r.rotate(.5*Math.PI),r.translate(0,-i)
break
case 7:r.rotate(.5*Math.PI),r.translate(a,-i),r.scale(-1,1)
break
case 8:r.rotate(-.5*Math.PI),r.translate(-a,0)}},_renderImageToCanvas:function(){function t(t,e,a){var i,r,n=document.createElement("canvas"),s=n.getContext("2d"),o=0,h=a,c=a
for(n.width=1,n.height=a,s.drawImage(t,0,0),i=s.getImageData(0,0,1,a).data;c>o;)0===i[4*(c-1)+3]?h=c:o=c,c=h+o>>1
return 0===(r=c/a)?1:r}return i.os.ios?i.os.ios>=7?function(e,a,i,r,n,s){var o=a.naturalWidth,h=a.naturalHeight,c=t(a,0,h)
return e.getContext("2d").drawImage(a,0,0,o*c,h*c,i,r,n,s)}:function(e,a,i,r,n,s){var o,h,c,l,d,g,u,m=a.naturalWidth,f=a.naturalHeight,_=e.getContext("2d"),p=function(t){var e,a,i=t.naturalWidth
return i*t.naturalHeight>1048576&&(e=document.createElement("canvas"),e.width=e.height=1,(a=e.getContext("2d")).drawImage(t,1-i,0),0===a.getImageData(0,0,1,1).data[3])}(a),v="image/jpeg"===this.type,w=0,b=0
for(p&&(m/=2,f/=2),_.save(),(o=document.createElement("canvas")).width=o.height=1024,h=o.getContext("2d"),c=v?t(a,0,f):1,l=Math.ceil(1024*n/m),d=Math.ceil(1024*s/f/c);w<f;){for(g=0,u=0;g<m;)h.clearRect(0,0,1024,1024),h.drawImage(a,-g,-w),_.drawImage(o,0,0,1024,1024,i+u,r+b,l,d),g+=1024,u+=l
w+=1024,b+=d}_.restore(),o=h=null}:function(t){var e=i.slice(arguments,1),a=t.getContext("2d")
a.drawImage.apply(a,e)}}()})})
define("3rd/webuploader/runtime/flash/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/flash/runtime.js"],function(e,t,i){var r=e("3rd/webuploader/base.js"),l=e("3rd/webuploader/runtime/flash/runtime.js"),n=r.$
return l.register("FilePicker",{init:function(e){var t,i,r=n.extend({},e)
for(t=r.accept&&r.accept.length,i=0;i<t;i++)r.accept[i].title||(r.accept[i].title="Files")
delete r.button,delete r.id,delete r.container,this.flashExec("FilePicker","init",r)},destroy:function(){this.flashExec("FilePicker","destroy")}})})
define("3rd/webuploader/runtime/flash/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/runtime/compbase.js"],function(e,t,i){function a(){var e={},t={},i=this.destroy,a=this,n=r.guid("webuploader_")
s.apply(a,arguments),a.type=o,a.exec=function(i,s){var n,h=this.uid,o=r.slice(arguments,2)
return t[h]=this,u[i]&&(e[h]||(e[h]=new u[i](this,a)),(n=e[h])[s])?n[s].apply(n,o):a.flashExec.apply(this,arguments)},window[n]=function(){var e=arguments
setTimeout(function(){(function(e,i){var r,s,n=e.type||e
s=(r=n.split("::"))[0],"Ready"===(n=r[1])&&s===a.uid?a.trigger("ready"):t[s]&&t[s].trigger(n.toLowerCase(),e,i)}).apply(null,e)},1)},this.jsreciver=n,this.destroy=function(){return i&&i.apply(this,arguments)},this.flashExec=function(e,t){var i=a.getFlash(),s=r.slice(arguments,2)
return i.exec(this.uid,e,t,s)}}var r=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/runtime/runtime.js"),n=e("3rd/webuploader/runtime/compbase.js"),h=r.$,o="flash",u={}
return r.inherits(s,{constructor:a,init:function(){var e,t=this.getContainer(),i=this.options
t.css({position:"absolute",top:"-8px",left:"-8px",width:"9px",height:"9px",overflow:"hidden"}),e='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+i.swf+'" ',r.browser.ie&&(e+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),e+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+i.swf+'" /><param name="flashvars" value="uid='+this.uid+"&jsreciver="+this.jsreciver+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',t.html(e)},getFlash:function(){return this._flash?this._flash:(this._flash=h("#"+this.uid).get(0),this._flash)}}),a.register=function(e,t){return t=u[e]=r.inherits(n,h.extend({flashExec:function(){var e=this.owner
return this.getRuntime().flashExec.apply(e,arguments)}},t))},function(){var e
try{e=(e=navigator.plugins["Shockwave Flash"]).description}catch(t){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(t){e="0.0"}}return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1],10)}()>=11.4&&s.addRuntime(o,a),a})
define("3rd/webuploader/runtime/flash/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/flash/runtime.js","3rd/webuploader/runtime/client.js"],function(e,r,t){var n=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/runtime/flash/runtime.js"),o=e("3rd/webuploader/runtime/client.js"),i=n.$,a=1
return s.register("Transport",{init:function(){this._status=0,this._response=null,this._responseJson=null},send:function(){var e,r=this.owner,t=this.options,n=this._initAjax(),s=r._blob,o=t.server
o+="&seq="+a++,n.connectRuntime(s.ruid),t.sendAsBinary?(o+=(/\?/.test(o)?"&":"?")+i.param(r._formData),e=s.uid):(i.each(r._formData,function(e,r){n.exec("append",e,r)}),n.exec("appendBlob",t.fileVal,s.uid,t.filename||r._formData.name||"")),this._setRequestHeader(n,t.headers),n.exec("send",{method:t.method,url:o,forceURLStream:t.forceURLStream,mimeType:"application/octet-stream"},e)},getStatus:function(){return this._status},getResponse:function(){return this._response||""},getResponseAsJson:function(){return this._responseJson},abort:function(){var e=this._xhr
e&&(e.exec("abort"),e.destroy(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,r=new o("XMLHttpRequest")
return r.on("uploadprogress progress",function(r){var t=r.loaded/r.total
return t=Math.min(1,Math.max(0,t)),e.trigger("progress",t)}),r.on("load",function(){var t,n=r.exec("getStatus"),s=!1,o=""
return r.off(),e._xhr=null,n>=200&&n<300?s=!0:n>=500&&n<600?(s=!0,o="server"):o="http",s&&(e._response=r.exec("getResponse"),e._response=decodeURIComponent(e._response),t=window.JSON&&window.JSON.parse||function(e){try{return new Function("return "+e).call()}catch(e){return{}}},e._responseJson=e._response?t(e._response):{}),r.destroy(),r=null,o?e.trigger("error",o):e.trigger("load")}),r.on("error",function(){r.off(),e._xhr=null,e.trigger("error","http")}),e._xhr=r,r},_setRequestHeader:function(e,r){i.each(r,function(r,t){e.exec("setRequestHeader",r,t)})}})})
