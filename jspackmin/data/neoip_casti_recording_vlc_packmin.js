function disable_firebug(){var c=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var d=0;d<c.length;++d){window.console[c[d]]=function(){}}}disable_firebug();if(typeof neoip=="undefined"){var neoip={}}neoip.vlc_plugin_present=function(){var c=navigator.plugins.length;for(var d=0;d<c;d++){if(navigator.plugins[d].name=="VLC Multimedia Plug-in"){return true}}return false};neoip.vlc_object=function(f,d,e){this.width=d;this.height=e;this.object_id=f;if(neoip.vlc_plugin_present()==false){throw ("VLC Multimedia Plugin Not available on your browser.")}};neoip.vlc_object.prototype.write=function(d){var c="";c+='<object type="application/x-vlc-plugin"';c+=' pluginspage="http://www.videolan.org/"';c+=' version="VideoLAN.VLCPlugin.2"';c+=' width="'+this.width+'"';c+=' height="'+this.height+'"';c+=' id="'+this.object_id+'"';c+=">";c+="</object>";document.getElementById(d).innerHTML=c};if(typeof neoip=="undefined"){var neoip={}}neoip.casti_ctrl_t=function(b){this.m_callback=b;this.m_webdetect_uri=null;this.m_cast_name=null;this.m_cast_privtext=null;this.m_scasti_uri=null;this.m_scasti_mod=null;this.m_mdata_srv_uri=null;this.m_http_peersrc_uri=null;this.m_swarm_state="stopped";this.m_refresh_xdomrpc=null;this.m_refresh_delay=3;this.m_refresh_timeout=null};neoip.casti_ctrl_t.prototype.destructor=function(){if(this.m_refresh_xdomrpc){this.m_refresh_xdomrpc.destructor();this.m_refresh_xdomrpc=null}if(this.m_refresh_timeout){clearTimeout(this.m_refresh_timeout);this.m_refresh_timeout=null}};neoip.casti_ctrl_t.prototype.webdetect_uri=function(b){this.m_webdetect_uri=b;return this};neoip.casti_ctrl_t.prototype.cast_name=function(b){this.m_cast_name=b;return this};neoip.casti_ctrl_t.prototype.cast_privtext=function(b){this.m_cast_privtext=b;return this};neoip.casti_ctrl_t.prototype.scasti_uri=function(b){this.m_scasti_uri=b;return this};neoip.casti_ctrl_t.prototype.scasti_mod=function(b){this.m_scasti_mod=b;return this};neoip.casti_ctrl_t.prototype.mdata_srv_uri=function(b){this.m_mdata_srv_uri=b;return this};neoip.casti_ctrl_t.prototype.http_peersrc_uri=function(b){this.m_http_peersrc_uri=b;return this};neoip.casti_ctrl_t.prototype.refresh_period=function(b){this.m_refresh_delay=b;return this};neoip.casti_ctrl_t.prototype.is_recording=function(){return this.m_refresh_timeout!=null};neoip.casti_ctrl_t.prototype.swarm_state=function(){return this.m_swarm_state};neoip.casti_ctrl_t.prototype.cast_privhash=function(){return this.m_cast_privhash};neoip.casti_ctrl_t.prototype.start_recording=function(){if(this.is_recording()){return}this.m_refresh_timeout=setTimeout(neoip.basic_cb_t(this._refresh_timeout_cb,this),0*1000)};neoip.casti_ctrl_t.prototype.stop_recording=function(){if(!this.is_recording()){return}this.m_swarm_state="stopped";clearTimeout(this.m_refresh_timeout);this.m_refresh_timeout=null;var c=this.m_webdetect_uri+"/neoip_casti_ctrl_wpage_jsrest.js";var d=new neoip.xdomrpc_t(c,null,"release_stream",this.m_mdata_srv_uri?this.m_mdata_srv_uri:"",this.m_cast_name?this.m_cast_name:"",this.m_cast_privtext?this.m_cast_privtext:"")};neoip.casti_ctrl_t.prototype._refresh_timeout_cb=function(){var b=this.m_webdetect_uri+"/neoip_casti_ctrl_wpage_jsrest.js";this.m_refresh_xdomrpc=new neoip.xdomrpc_t(b,neoip.xdomrpc_cb_t(this._xdomrpc_cb,this),"request_stream",this.m_mdata_srv_uri?this.m_mdata_srv_uri:"",this.m_cast_name?this.m_cast_name:"",this.m_cast_privtext?this.m_cast_privtext:"",this.m_scasti_uri?this.m_scasti_uri:"",this.m_scasti_mod?this.m_scasti_mod:"",this.m_http_peersrc_uri?this.m_http_peersrc_uri:"")};neoip.casti_ctrl_t.prototype._xdomrpc_cb=function(k,i,j,l){this.m_refresh_xdomrpc.destructor();this.m_refresh_xdomrpc=null;this.m_refresh_timeout=setTimeout(neoip.basic_cb_t(this._refresh_timeout_cb,this),this.m_refresh_delay*1000);var g=this.m_swarm_state;if(j){this.m_swarm_state="error due to "+j.string}else{if(l==""){this.m_cast_privhash=l;this.m_swarm_state="starting"}else{this.m_cast_privhash=l;this.m_swarm_state="started"}}if(this.m_swarm_state!=g){if(this.m_callback){var h={old_state:g,new_state:this.m_swarm_state};this.m_callback("changed_state",h)}}};neoip.casti_ctrl_cb_t=function(f,g,h){var e=g||window;return function(a,b){f.call(e,this,h,a,b)}};var neoip_base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",encode_safe:function(r){var t="";var i,m,o,l,n,p,q;var s=0;r=this._utf8_encode(r);while(s<r.length){i=r.charCodeAt(s++);m=r.charCodeAt(s++);o=r.charCodeAt(s++);l=i>>2;n=((i&3)<<4)|(m>>4);p=((m&15)<<2)|(o>>6);q=o&63;if(isNaN(m)){p=q=64}else{if(isNaN(o)){q=64}}t=t+this._keyStr.charAt(l)+this._keyStr.charAt(n)+this._keyStr.charAt(p)+this._keyStr.charAt(q)}return t},decode_safe:function(r){var t="";var i,m,o;var l,n,p,q;var s=0;r=r.replace(/[^A-Za-z0-9\-\_\=]/g,"");while(s<r.length){l=this._keyStr.indexOf(r.charAt(s++));n=this._keyStr.indexOf(r.charAt(s++));p=this._keyStr.indexOf(r.charAt(s++));q=this._keyStr.indexOf(r.charAt(s++));i=(l<<2)|(n>>4);m=((n&15)<<4)|(p>>2);o=((p&3)<<6)|q;t=t+String.fromCharCode(i);if(p!=64){t=t+String.fromCharCode(m)}if(q!=64){t=t+String.fromCharCode(o)}}t=this._utf8_decode(t);return t},_utf8_encode:function(c){c=c.replace(/\r\n/g,"\n");var f="";for(var g=0;g<c.length;g++){var h=c.charCodeAt(g);if(h<128){f+=String.fromCharCode(h)}else{if((h>127)&&(h<2048)){f+=String.fromCharCode((h>>6)|192);f+=String.fromCharCode((h&63)|128)}else{f+=String.fromCharCode((h>>12)|224);f+=String.fromCharCode(((h>>6)&63)|128);f+=String.fromCharCode((h&63)|128)}}}return f},_utf8_decode:function(f){var c="";var h=0;var g=c1=c2=0;while(h<f.length){g=f.charCodeAt(h);if(g<128){c+=String.fromCharCode(g);h++}else{if((g>191)&&(g<224)){c2=f.charCodeAt(h+1);c+=String.fromCharCode(((g&31)<<6)|(c2&63));h+=2}else{c2=f.charCodeAt(h+1);c3=f.charCodeAt(h+2);c+=String.fromCharCode(((g&15)<<12)|((c2&63)<<6)|(c3&63));h+=3}}}return c}};if(typeof neoip=="undefined"){var neoip={}}neoip.core_t=function(){};neoip.core=new neoip.core_t();neoip.core.isIE=(navigator.appName.indexOf("Microsoft")!=-1);neoip.core.isWebKit=(navigator.userAgent.indexOf("WebKit")!=-1);neoip.core_t.prototype.object_clone=function(f,g){if(typeof(f)!="object"){return f}if(f==null){return f}var h=new Object();if(g==true){for(var e in f){h[e]=neoip.object_clone(f[e],g)}}else{for(var e in f){h[e]=f[e]}}return h};neoip.core_t.prototype.build_nonce_str=function(f){var g="";for(var h=0;h<f;h++){var e=Math.floor(Math.random()*(26+26+10));if(e<26){g+=String.fromCharCode(e+"A".charCodeAt(0))}else{if(e<(26+26)){g+=String.fromCharCode(e-(26)+"a".charCodeAt(0))}else{g+=String.fromCharCode(e-(26+26)+"0".charCodeAt(0))}}}return g};neoip.core_t.prototype.dom_event_listener=function(d,f,e){if(d.addEventListener){d.addEventListener(f,e,false);return true}else{if(d.attachEvent){return d.attachEvent("on"+f,e)}else{return false}}};neoip.basic_cb_t=function(e,f){var d=f||window;return function(){e.call(d)}};neoip.core_t.prototype.build_xmlhttp_obj=function(){var d=null;try{d=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{d=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){d=null}}if(d==null){d=new XMLHttpRequest()}return d};neoip.core_t.prototype.download_file_insync=function(d,e){var f=this.build_xmlhttp_obj();if(e==true){d+=d.indexOf("?")==-1?"?":"&";d+="nocache_workaround="+Math.floor(Math.random()*999999)}f.open("GET",d,false);f.send(null);if(f.status!=200){return null}return f.responseText};neoip.core_t.prototype.cookie_write=function(g,l,i,k){var j=g+"="+l;if(i){var h=new Date();h.setTime(h.getTime()+(i*24*60*60*1000));j+="; expires="+h.toGMTString()}if(k==null){k=window.location.pathname}j+="; path="+k;document.cookie=j};neoip.core_t.prototype.cookie_read=function(c){var i=c+"=";var g=document.cookie.split(";");for(var j=0;j<g.length;j++){var h=g[j];while(h.charAt(0)==" "){h=h.substring(1,h.length)}if(h.indexOf(i)==0){return h.substring(i.length,h.length)}}return null};neoip.core_t.prototype.cookie_delete=function(b){createCookie(b,"",-1)};neoip.core_t.prototype.doc_urivar_get=function(g){var j=window.location.search.substring(1);var h=j.split("&");for(var f=0;f<h.length;f++){var i=h[f].split("=");if(i[0]==g){return i[1]}}return null};neoip.core_t.prototype.doc_urivar_arr=function(){var j={};var l=document.location.search.substring(1);var i=l.split("&");for(var m=0;m<i.length;m++){var n=i[m].split("=");var h=n[0];var k=n[1];j[h]=k}return j};neoip.core_t.prototype.is_absolute_uri=function(b){if(/^http:\/\//.test(b)){return true}if(/^https:\/\//.test(b)){return true}if(/^ftp:\/\//.test(b)){return true}return false};neoip.core_t.prototype.is_absolute_path=function(b){if(/^\//.test(b)){return true}return false};neoip.core_t.prototype.dirname=function(b){return b.replace(/([^\/]*)$/,"")};neoip.core_t.prototype.to_absolute_uri=function(f){if(this.is_absolute_uri(f)){return f}if(this.is_absolute_path(f)){var g=/(.*:\/\/.*?)\//(location.href);var h=g[1];return h+f}var e=location.href;e=e.substring(0,e.lastIndexOf("/"));while(/^\.\./.test(f)){e=e.substring(0,e.lastIndexOf("/"));f=f.substring(3)}return e+"/"+f};neoip.core_t.prototype.doscramble_uri=function(f){if(1){return f}else{if(/.*?:\/\/.*?\//.test(f)==false){return f}var d=/(.*?:\/\/.*?)\//(f)[1];var e=/.*?:\/\/.*?\/(.*)/(f)[1];e=neoip_base64.encode_safe(e);return d+"/scrambled/"+e}};if(typeof neoip=="undefined"){var neoip={}}neoip.xdomrpc_t=function(v,B,z,p,q,r,s,t,u,w,x,y,A){this.m_obj_id=neoip_xdomrpc_cb_new_obj_id();this.m_callback=B;this.m_rpc_url=v;this.m_expire_delay=3*1000;this.m_expire_timeout=setTimeout(neoip.basic_cb_t(this._expire_timeout_cb,this),this.m_expire_delay);neoip_xdomrpc_cb_doregister(this);var o=this.m_rpc_url;o+="?obj_id="+this.m_obj_id;o+="&js_callback=neoip_xdomrpc_cb_callback_from_server";o+="&method_name="+escape(z);if(p!=null){o+="&arg0="+escape(p)}if(q!=null){o+="&arg1="+escape(q)}if(r!=null){o+="&arg2="+escape(r)}if(s!=null){o+="&arg3="+escape(s)}if(t!=null){o+="&arg4="+escape(t)}if(u!=null){o+="&arg5="+escape(u)}if(w!=null){o+="&arg6="+escape(w)}if(x!=null){o+="&arg7="+escape(x)}if(y!=null){o+="&arg8="+escape(y)}if(A!=null){o+="&arg9="+escape(A)}if(0){this._call_uri=o}else{this._call_uri=neoip.core.doscramble_uri(o)}this.m_zerotimer_init=setTimeout(neoip.basic_cb_t(this._zerotimer_init_cb,this),0);this.m_script_monitor=neoip.core.isIE||neoip.core.isWebKit};neoip.xdomrpc_t.prototype.destructor=function(){if(this.m_zerotimer_init){clearTimeout(this.m_zerotimer_init)}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout)}neoip_xdomrpc_cb_unregister(this);var b="neoip_xdomrpc_script_"+this.m_obj_id;if(this.m_script_monitor){this._dtor_all_script_monitor(b)}else{this._dtor_all_script_default(b)}};neoip.xdomrpc_t.prototype._zerotimer_init_cb=function(){var f=this._call_uri;clearTimeout(this.m_zerotimer_init);this.m_zerotimer_init=null;var i=this._get_root_elem();var j="neoip_xdomrpc_script_"+this.m_obj_id;var h="neoip_xdomrpc_script_reply_var_"+this.m_obj_id;var g=document.createElement("script");g.setAttribute("id",j+"_pre");g.text="var "+h+"=null;";i.appendChild(g);var g=document.createElement("script");g.setAttribute("src",f);g.setAttribute("id",j+"_call");i.appendChild(g);if(this.m_script_monitor){this._ctor_post_script_monitor(g,j)}else{this._ctor_post_script_default(g,j)}};neoip.xdomrpc_t.prototype._get_root_elem=function(){if(0){var b=document.getElementById("neoip.xdomrpc_temp_div");if(!b){b=document.createElement("div");b.setAttribute("id","neoip.xdomrpc_temp_div");document.body.appendChild(b)}}else{var b=document.getElementsByTagName("head")[0]}return b};neoip.xdomrpc_t.prototype._ctor_post_script_default=function(e,g){var h=this._get_root_elem();var f=document.createElement("script");f.setAttribute("id",g+"_post");f.text="neoip_xdomrpc_cb_callback_from_server("+this.m_obj_id+");";h.appendChild(f)};neoip.xdomrpc_t.prototype._dtor_all_script_default=function(d){var e=this._get_root_elem();try{e.removeChild(document.getElementById(d+"_pre"))}catch(f){}try{e.removeChild(document.getElementById(d+"_call"))}catch(f){}try{e.removeChild(document.getElementById(d+"_post"))}catch(f){}};neoip.xdomrpc_t.prototype._ctor_post_script_monitor=function(d,f){var e=function(a){var b=a;return function(){if(this.readyState==null||this.readyState=="loaded"||this.readyState=="complete"){neoip_xdomrpc_cb_callback_from_server(b)}}};d.onreadystatechange=e(this.m_obj_id);d.onload=e(this.m_obj_id);d.onerror=e(this.m_obj_id)};neoip.xdomrpc_t.prototype._dtor_all_script_monitor=function(d){var e=this._get_root_elem();var f=function(k,b,c){var a=k;var j=b;var l=c;return function(){var h=document.getElementById(a);var i=h.readyState;if(i!=null&&i!="loaded"&&i!="complete"){setTimeout(l(a,j,l),1*1000);return}try{j.removeChild(h)}catch(g){}}};setTimeout(f(d+"_pre",e,f),0);setTimeout(f(d+"_call",e,f),0)};neoip.xdomrpc_t.prototype._expire_timeout_cb=function(){clearInterval(this.m_expire_timeout);this.m_expire_timeout=null;var b={code:-1,string:"expired after "+this.m_expire_delay};this.callback_cb(this.m_obj_id,b,null)};neoip.xdomrpc_t.prototype.callback_cb=function(e,f,d){if(this.m_callback){this.m_callback(f,d)}else{this.destructor()}};neoip.xdomrpc_cb_t=function(f,g,h){var e=g||window;return function(a,b){f.call(e,this,h,a,b)}};var neoip_xdomrpc_cb_arr=new Array();function neoip_xdomrpc_cb_new_obj_id(c){var d;do{d=Math.floor(Math.random()*65536)}while(neoip_xdomrpc_cb_arr[d]!=null);return d}function neoip_xdomrpc_cb_doregister(b){neoip_xdomrpc_cb_arr[b.m_obj_id]=b}function neoip_xdomrpc_cb_unregister(b){delete neoip_xdomrpc_cb_arr[b.m_obj_id]}function neoip_xdomrpc_cb_callback_from_server(obj_id){var reply=eval("neoip_xdomrpc_script_reply_var_"+obj_id);var obj=neoip_xdomrpc_cb_arr[obj_id];if(obj==null){return}eval("delete neoip_xdomrpc_script_reply_var_"+obj_id);if(reply==null){obj.callback_cb(obj_id,{code:-1,string:"Server Unreachable"},null);return}obj.callback_cb(obj_id,reply.fault,reply.returned_val)}if(typeof neoip=="undefined"){var neoip={}}neoip.apps_detect_t=function(k,l,g,i,h){this.m_callback=i;this.m_suffix_name=k;this.m_first_port=l;this.m_last_port=g;this.m_options=h!=null?neoip.core.object_clone(h):{};this.m_hostname="127.0.0.1";if(this.m_options.hostname!=undefined){this.m_hostname=this.m_options.hostname}this.m_max_concurrent=1;if(this.m_options.max_concurrent!=undefined){this.m_max_concurrent=this.m_options.max_concurrent}this.m_expire_delay=10*1000;this.m_expire_timeout=setTimeout(neoip.basic_cb_t(this._expire_timeout_cb,this),this.m_expire_delay);this.m_xdomrpc_arr=[];for(var j=this.m_first_port;j<=this.m_last_port;j++){this.m_xdomrpc_arr[j]="todo"}this._launch_next_probe()};neoip.apps_detect_t.prototype.destructor=function(){for(var b in this.m_xdomrpc_arr){if(typeof(this.m_xdomrpc_arr[b])!="object"){continue}this.m_xdomrpc_arr[b].destructor();this.m_xdomrpc_arr[b]=null}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout);this.m_expire_timeout=null}};neoip.apps_detect_t.prototype.suffix_name=function(){return this.m_suffix_name};neoip.apps_detect_t.prototype.first_port=function(){return this.m_first_port};neoip.apps_detect_t.prototype.last_port=function(){return this.m_last_port};neoip.apps_detect_t.prototype.hostname=function(){return this.m_hostname};neoip.apps_detect_t.prototype.options=function(){return this.m_options};neoip.apps_detect_t.prototype._launch_next_probe=function(){var h=0;var f=0;for(var g in this.m_xdomrpc_arr){if(this.m_xdomrpc_arr[g]=="done"){f++}if(typeof(this.m_xdomrpc_arr[g])=="object"){h++}}if(f==(this.m_last_port-this.m_first_port+1)){var j={present:false};neoip_apps_detect_arr[this.m_suffix_name]=j;if(this.m_callback){this.m_callback("absent")}return}for(var g in this.m_xdomrpc_arr){if(this.m_xdomrpc_arr[g]!="todo"){continue}if(h>=this.m_max_concurrent){break}var i="http://"+this.m_hostname+":"+g+"/neoip_"+this.m_suffix_name+"_appdetect_jsrest.js";this.m_xdomrpc_arr[g]=new neoip.xdomrpc_t(i,neoip.xdomrpc_cb_t(this._xdomrpc_cb,this,g),"probe_apps");h++}};neoip.apps_detect_t.prototype._xdomrpc_cb=function(g,j,k,h){var l=j;this.m_xdomrpc_arr[l].destructor();this.m_xdomrpc_arr[l]="done";if(k==null){var i={};i.outter_uri="http://"+this.m_hostname+":"+l;i.version=h;i.present=true;neoip_apps_detect_arr[this.m_suffix_name]=i;if(this.m_callback){this.m_callback("found")}return}this._launch_next_probe()};neoip.apps_detect_t.prototype._expire_timeout_cb=function(){neoip_apps_detect_arr[this.m_suffix_name]={present:false};if(this.m_callback){this.m_callback("expired after "+this.m_expire_delay+"-msec")}};neoip.apps_detect_cb_t=function(f,g,h){var e=g||window;return function(a){f.call(e,this,h,a)}};var neoip_apps_detect_arr=new Array();neoip.apps_present=function(b){if(neoip_apps_detect_arr[b]==null){return false}return neoip_apps_detect_arr[b].present};neoip.apps_version=function(b){console.assert(neoip.apps_present(b));return neoip_apps_detect_arr[b].version};neoip.apps_version_check=function(o,n){var j=neoip.apps_version(o);var m=parseInt(j.split(".")[0],10);var k=parseInt(n.split(".")[0],10);if(m<k){return false}var p=parseInt(j.split(".")[1],10);var l=parseInt(n.split(".")[1],10);if(p<l){return false}var r=parseInt(j.split(".")[2],10);var q=parseInt(n.split(".")[2],10);if(r<q){return false}return true};neoip.outter_uri=function(b){console.assert(neoip.apps_present(b));return neoip_apps_detect_arr[b].outter_uri};