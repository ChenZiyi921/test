"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},JZFQ={};JZFQ.body=document.querySelectorAll("body")[0],JZFQ.h5PopClass={init:function(e){var t=this;e&&"object"==(void 0===e?"undefined":_typeof(e))&&t.popMainRun(e,function(e){t.bindEvent(e)})},popMainRun:function(e,t){var o=document.createElement("div"),n=document.createElement("div");n.className="h5pop-mask",n.id="h5PopMasks",o.className="h5pop-main clearfix",o.id="h5PopMainEle";var a="";e.isHideClose&&(a+='<a href="javascript:;" class="h5pop-close">×</a>'),e.title&&(a+='<h3 class="h5tips-title">'+e.title+"</h3>"),e.tipTxt&&(a+='<div class="h5pop-content clearfix">'+e.tipTxt+"</div>"),a+='<div class="h5pop-footer">',e.cancelBtn&&(a+='<a type="button" class="h5pop-cancel" href="javascript:;">'+e.cancelBtn+"</a>"),e.confirmBtn&&(a+='<a type="button" class="h5pop-confirm" href="javascript:;">'+e.confirmBtn+"</a>"),a+="</div>",o.innerHTML=a,JZFQ.body.appendChild(o),JZFQ.body.appendChild(n),t(e)},bindEvent:function(e){var t=this,o=!0;document.querySelector("#h5PopMainEle").onclick=function(n){var a=(n=n||window.event).target||n.srcElement,r=a.className.toLowerCase()||a.id;o&&("h5pop-cancel"==r&&e.cancelBtnRun&&"function"==typeof e.cancelBtnRun&&e.cancelBtnRun(),"h5pop-confirm"==r&&e.confirmBtnRun&&"function"==typeof e.confirmBtnRun&&e.confirmBtnRun(),"h5pop-close"!=r&&"h5pop-cancel"!=r&&"h5pop-confirm"!=r||(n.preventDefault(),t.removePop(),o=!1))}},removePop:function(){var e=document.getElementById("h5PopMasks"),t=document.getElementById("h5PopMainEle");e.parentNode&&t.parentNode&&(e.parentNode.removeChild(e),t.parentNode.removeChild(t))}},JZFQ.ajax=function(opts){var defaults={type:"GET",url:"",data:"",dataType:"json",async:!0,cache:!0,contentType:"application/x-www-form-urlencoded;charset=utf-8",param:"",success:function(){},error:function(){}};for(var key in opts)defaults[key]=opts[key];if("object"===_typeof(defaults.data)){var str="";for(var key in defaults.data)str+=key+"="+defaults.data[key]+"&";defaults.data=str.substring(0,str.length-1)}defaults.type=defaults.type.toUpperCase(),defaults.cache=defaults.cache?"":"&"+(new Date).getTime(),"GET"===defaults.type&&(defaults.data||defaults.cache)&&(defaults.url+="?"+defaults.data+defaults.cache);var oXhr=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");if(oXhr.param=defaults.param,oXhr.open(defaults.type,defaults.url,defaults.async),defaults.headers)for(var k in defaults.headers)oXhr.setRequestHeader(k,defaults.headers[k]);"GET"===defaults.type?oXhr.send(null):(oXhr.setRequestHeader("Content-type",defaults.contentType),oXhr.send(defaults.data)),void 0!==defaults.setToken&&"function"==typeof defaults.setToken&&defaults.setToken(oXhr),oXhr.onreadystatechange=function(){if(4===oXhr.readyState)if(200===oXhr.status){if("function"==typeof defaults.success)if("json"==defaults.dataType)try{defaults.success.call(oXhr,eval("("+oXhr.responseText+")"))}catch(e){}else try{defaults.success.call(oXhr,oXhr.responseText)}catch(e){}}else"function"==typeof defaults.error&&defaults.error()}},JZFQ.uploadImg=function(e){if("object"==(void 0===e?"undefined":_typeof(e))){var t=this,o=new FormData,n=new XMLHttpRequest;o.append("image",e.ele.files[0]),n.open("post",e.url,!0),n.onreadystatechange=function(o){4===n.readyState&&(200===n.status?"200"==(o=JSON.parse(n.responseText)).status?"function"==typeof e.callback&&e.callback.call(this):t.tips(o.msg):t.tips("ajax error"))},n.send(o)}},JZFQ.isweixin=function(){return"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},JZFQ.loadJS=function(e,t,o,n){if(!document.getElementById(n)){var a=document.createElement("script");a.src=e,a.type="text/javascript",a.id=n||"",document.querySelectorAll(t||"body")[0].appendChild(a),a.readyState?a.onreadystatechange=function(){"loaded"!=a.readyState&&"complete"!=a.readyState||(a.onreadystatechange=null,o.call(this))}:a.onload=function(){o.call(this)}}},JZFQ.tips=function(e){if(!document.getElementById("systemTips")&&e){var t=null,o=document.createElement("div");o.id="systemTips",o.innerHTML=e.toString(),document.querySelector("body").appendChild(o);var n=document.getElementById("systemTips");n&&(t=setTimeout(function(){n.parentNode&&(n.parentNode.removeChild(n),clearTimeout(t))},2e3))}},JZFQ.ranStr=function(e){for(var t="abcdefghijklmnopqrstuvwxyzABCDEFGHIZKLMNOPQRSTUVWXYZ0123456789",o="",n=0;n<e;n++){var a=Math.floor(Math.random()*(t.length-1));o+=t.charAt(a)}return o},JZFQ.jsonpAjax=function(e){var t,o,n,a,r=this,s=e||{url:"",data:{}||[],success:function(){},error:function(){}},i=[],c=null,d=null,l=s.timeout||0,u=r.ranStr(10);for(var f in s.data)s.data.hasOwnProperty(f)&&i.push(encodeURIComponent(f)+"="+encodeURIComponent(s.data[f]));(o=s.url.split("?")).length>1&&i.push(o[1]),n="callback"+u,i.push("callback="+n),t=i.join("&"),s.url=o[0]+"?"+t,(c=document.createElement("script")).loaded=!1,window[n]=function(e){"function"!=!_typeof(s.success)&&(s.success(e),c.loaded=!0)},(d=document.getElementsByTagName("head")[0]).insertBefore(c,d.firstChild),c.src=s.url,c[a="onload"in c?"onload":"onreadystatechange"]=function(){c.readyState&&"loaded"!=c.readyState||("loaded"!=c.readyState||0!=c.loaded?setTimeout(function(){c.parentNode&&c.parentNode.removeChild(c)&&d.removeNode&&d.removeNode(this),c=c[a]=c.onerror=window[n]=null},1e3):c.onerror())},c.onerror=function(){null==window[n]&&r.tips("请求超时，请重试！"),s.error&&s.error(),c.parentNode&&c.parentNode.removeChild(c)&&d.removeNode&&d.removeNode(this),c=c[a]=c.onerror=window[n]=null},0!=l&&setTimeout(function(){c&&0==c.loaded&&(window[n]=null,c.onerror())},l)},JZFQ.parents=function(e,t){for(var o=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector;e&&!o.call(e,t);)e=e.parentElement;return e},JZFQ.css=function(e,t){if(/Object/.test(Object.prototype.toString.call(t)))for(var o in t)t[o]&&(e.style[o]=t[o].toString());return e},JZFQ.offsetTop=function(e){for(var t=e.offsetTop,o=e.offsetParent;o;)t+=o.offsetTop,o=o.offsetParent;return t},JZFQ.offsetLeft=function(e){for(var t=e.offsetLeft,o=e.offsetParent;o;)t+=o.offsetLeft,o=o.offsetParent;return t},JZFQ.getQueryString=function(e){var t=window.location.href;if(/\?/.test(t)&&!/\?$/.test(t)&&/\?(.+)/.test(t)){var o=t.split("?");if(o[0]!==t){for(var n=o[1].split("&"),a={},r=0;r<n.length;r++){var s=n[r].split("=");a[s[0]]=s[1]}return e?a[e]:a}}},JZFQ.urlSplicing=function(e,t){if(e instanceof Array)for(var o=0;o<e.length;o++)for(var n in e[o])this.getUrlValue(n)||(/^\?/.test(location.search)?location.search+="&"+n+"="+e[o][n]:location.search+="?"+n+"="+e[o][n]);else this.getUrlValue(e)||(/^\?/.test(location.search)?location.search+="&"+e+"="+t:location.search+="?"+e+"="+t)},JZFQ.CreateLoading=function(){if(!document.getElementById("loadingWrap")){var e="",t="",o=["loadfirst","second","loadlast"],n=document.createElement("div");n.id="loadingWrap";for(var a=1;a<5;a++)e+='<div class="circle'+a+'"></div>';for(var r=0;r<3;r++)t+='<div class="loading-container '+o[r]+'">'+e+"</div>";n.innerHTML='<div class="loading">'+t+"</div>",document.body.appendChild(n)}},JZFQ.RemoveLoading=function(){var e=document.getElementById("loadingWrap");e&&document.body.removeChild(e)},JZFQ.formatNumber=function(e){e=(e||0).toString();if(/\,/.test(e))return e;if(/\./.test(e)){var t="."+e.split(".")[1];e=e.split(".")[0]}else t="";for(var o=/\d{3}$/,n="";o.test(e);){if(n=RegExp.lastMatch+n,e===RegExp.lastMatch){e="";break}n=","+n,e=RegExp.leftContext}return e&&(n=e+n),/\./.test(e+t)?n+t:n},JZFQ.goTop=function(e,t){window.animation=window.requestAnimationFrame||function(e){return setTimeout(e,1e3/60)};e=document.querySelector(e);window.addEventListener("scroll",function(){var o=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,n=document.documentElement.clientHeight||document.body.clientHeight;o>=(Math.abs(t)||n)?e.style.display="block":e.style.display="none"},!1),e.addEventListener("click",function e(){var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;t>0&&(window.animation(e),window.scrollTo(0,t-t/30))},!1)},JZFQ.copy=function(e,t){document.body.querySelector(".cInpt")||(createInput=document.createElement("input"),createInput.setAttribute("readonly","readonly"),createInput.value=e,document.body.appendChild(createInput),-1!=document.body.className.indexOf("ios")?createInput.setSelectionRange(0,e.length):createInput.select(),document.execCommand("Copy"),createInput.className="cInpt",createInput.style.display="none",this.tips(t||"复制成功"),setTimeout(function(){document.body.removeChild(createInput)},2e3))},JZFQ.isMobile=function(){var e=navigator.userAgent,t=/Android|HTC/i.test(e),o=!t&&/iPad/i.test(e),n=!t&&/iPod|iPhone/i.test(e),a=o||n;(a||t)&&(this.body.classList.add("mobile"),this.body.classList.add(a?"ios":"android"))},JZFQ.isMobile();