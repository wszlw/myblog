define("3rd/webuploader/runtime/flash/blob.js",["3rd/webuploader/runtime/flash/runtime.js","3rd/webuploader/lib/blob.js"],function(e,r,l){var b=e("3rd/webuploader/runtime/flash/runtime.js"),i=e("3rd/webuploader/lib/blob.js")
return b.register("Blob",{slice:function(e,r){var l=this.flashExec("Blob","slice",e,r)
return new i(l.uid,l)}})})
define("3rd/webuploader/runtime/flash/image.js",["3rd/webuploader/runtime/flash/runtime.js"],function(e,a,r){return e("3rd/webuploader/runtime/flash/runtime.js").register("Image",{loadFromBlob:function(e){var a=this.owner
a.info()&&this.flashExec("Image","info",a.info()),a.meta()&&this.flashExec("Image","meta",a.meta()),this.flashExec("Image","loadFromBlob",e.uid)}})})
define("vue-weui/src/form/formElementDecorator.js",[],function(t,r,e){"use strict"
var i=function(t,r,e){"function"!=typeof t[r]&&(t[r]=e)}
e.exports=function(t,r){return function(e){var n=e.created
if(e.created=function(){if("function"==typeof n){for(var e=arguments.length,o=Array(e),a=0;a<e;a++)o[a]=arguments[a]
n.apply(this,o)}if(this.$formParent=null,function(t){for(var r=this.$parent;r;){if("mp-form"===r.$options.name){this.$formParent=r
break}r=r.$parent}}.call(this,this[t]),"[object Object]"!==Object.prototype.toString.call(this.APIs)&&(this.APIs=Object.create(null)),r){var f=this
i(this.APIs,"setValue",function(t){f[r]=t}),i(this.APIs,"getValue",function(){return f[r]}),i(this.APIs,"getFormParent",function(){return f.$formParent})}},t){var o=e.mounted
e.mounted=function(){if(this.$formParent&&this.$formParent.APIs.registerField(this[t],this),"function"==typeof o){for(var r=arguments.length,e=Array(r),i=0;i<r;i++)e[i]=arguments[i]
o.apply(this,e)}}
var a=e.beforeDestroy
e.beforeDestroy=function(){if(this.$formParent&&this.$formParent.APIs.deregisterField(this[t],this),"function"==typeof a){for(var r=arguments.length,e=Array(r),i=0;i<r;i++)e[i]=arguments[i]
a.apply(this,e)}},Object.prototype.hasOwnProperty.call(e,"watch")||Object.defineProperty(e,"watch",{enumerable:!0,configurable:!0,writable:!0,value:{}})
var f=e.watch[t]
e.watch[t]=function(){for(var t=arguments.length,r=Array(t),i=0;i<t;i++)r[i]=arguments[i]
if("function"==typeof e.watch&&f.apply(this,r),this.$formParent){var n=r[1]
n&&this.$formParent.APIs.deregisterField(n,this)
var o=r[0]
o&&this.$formParent.APIs.registerField(o,this)}}}return e}}})
define("pages/modules/link/link.js",["vue-weui/src/button/button.js"],function(t,e,i){"use strict"
var s=t("vue-weui/src/button/button.js"),n=Vue.extend(s).extend({methods:{click:function(t){this.loading||this.disabled||(this.$listeners&&this.$listeners.click?this.$emit("click",t):this.$props.href&&("_blank"===this.$props.target?window.openUrl(this.$props.href,{},!0):window.openUrl(this.$props.href)))}}})
Vue.component("mp-link",n)})
