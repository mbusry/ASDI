/** https://github.com/martinkr/jCookie - Copyright (c) 2008-2011 Martin Krause - Dual licensed under the MIT and GPL licenses. */
jQuery.jCookie=function(i,b,l,j){if(!navigator.cookieEnabled){return false}var j=j||{};if(typeof(arguments[0])!=="string"&&arguments.length===1){j=arguments[0];i=j.name;b=j.value;l=j.expires}i=encodeURI(i);if(b&&(typeof(b)!=="number"&&typeof(b)!=="string"&&b!==null)){return false}var e=j.path?"; path="+j.path:"";var f=j.domain?"; domain="+j.domain:"";var d=j.secure?"; secure":"";var g="";if(b||(b===null&&arguments.length==2)){l=(l===null||(b===null&&arguments.length==2))?-1:l;if(typeof(l)==="number"&&l!="session"&&l!==undefined){var k=new Date();k.setTime(k.getTime()+(l*24*60*60*1000));g=["; expires=",k.toGMTString()].join("")}document.cookie=[i,"=",encodeURI(b),g,f,e,d].join("");return true}if(!b&&typeof(arguments[0])==="string"&&arguments.length==1&&document.cookie&&document.cookie.length){var a=document.cookie.split(";");var h=a.length;while(h--){var c=a[h].split("=");if(jQuery.trim(c[0])===i){return decodeURI(c[1])}}return undefined}if(!document.cookie||!document.cookie.length){return undefined}return false};