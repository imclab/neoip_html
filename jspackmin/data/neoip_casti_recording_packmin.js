function disable_firebug(){var B=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var A=0;A<B.length;++A){window.console[B[A]]=function(){}}}disable_firebug();if(typeof neoip=="undefined"){var neoip={}}neoip.vlc_plugin_present=function(){var B=navigator.plugins.length;for(var A=0;A<B;A++){if(navigator.plugins[A].name=="VLC Multimedia Plugin"){return true}}return false};neoip.vlc_object=function(C,B,A){this.width=B;this.height=A;this.object_id=C;if(neoip.vlc_plugin_present()==false){throw ("VLC Multimedia Plugin Not available on your browser.")}};neoip.vlc_object.prototype.write=function(A){var B="";B+='<object type="application/x-vlc-plugin"';B+=' pluginspage="http://www.videolan.org/"';B+=' version="VideoLAN.VLCPlugin.2"';B+=' width="'+this.width+'"';B+=' height="'+this.height+'"';B+=' id="'+this.object_id+'"';B+=">";B+="</object>";document.getElementById(A).innerHTML=B};if(typeof neoip=="undefined"){var neoip={}}neoip.casti_ctrl_t=function(A){this.m_callback=A;this.m_webdetect_uri=null;this.m_cast_name=null;this.m_passwd_plain=null;this.m_httpi_uri=null;this.m_httpi_mod=null;this.m_mdata_srv_uri=null;this.m_http_peersrc_uri=null;this.m_swarm_state="stopped";this.m_refresh_xdomrpc=null;this.m_refresh_delay=3;this.m_refresh_timeout=null};neoip.casti_ctrl_t.prototype.destructor=function(){if(this.m_refresh_xdomrpc){this.m_refresh_xdomrpc.destructor();this.m_refresh_xdomrpc=null}if(this.m_refresh_timeout){clearTimeout(this.m_refresh_timeout);this.m_refresh_timeout=null}};neoip.casti_ctrl_t.prototype.webdetect_uri=function(A){this.m_webdetect_uri=A;return this};neoip.casti_ctrl_t.prototype.cast_name=function(A){this.m_cast_name=A;return this};neoip.casti_ctrl_t.prototype.passwd_plain=function(A){this.m_passwd_plain=A;return this};neoip.casti_ctrl_t.prototype.httpi_uri=function(A){this.m_httpi_uri=A;return this};neoip.casti_ctrl_t.prototype.httpi_mod=function(A){this.m_httpi_mod=A;return this};neoip.casti_ctrl_t.prototype.mdata_srv_uri=function(A){this.m_mdata_srv_uri=A;return this};neoip.casti_ctrl_t.prototype.http_peersrc_uri=function(A){this.m_http_peersrc_uri=A;return this};neoip.casti_ctrl_t.prototype.refresh_period=function(A){this.m_refresh_delay=A;return this};neoip.casti_ctrl_t.prototype.is_recording=function(){return this.m_refresh_timeout!=null};neoip.casti_ctrl_t.prototype.swarm_state=function(){return this.m_swarm_state};neoip.casti_ctrl_t.prototype.passwd_hash=function(){return this.m_passwd_hash};neoip.casti_ctrl_t.prototype.start_recording=function(){if(this.is_recording()){return }this.m_refresh_timeout=setTimeout(neoip.basic_cb_t(this._refresh_timeout_cb,this),0*1000)};neoip.casti_ctrl_t.prototype.stop_recording=function(){if(!this.is_recording()){return }this.m_swarm_state="stopped";clearTimeout(this.m_refresh_timeout);this.m_refresh_timeout=null;var B=this.m_webdetect_uri+"/neoip_casti_ctrl_wpage_jsrest.js";var A=new neoip.xdomrpc_t(B,null,"release_stream",this.m_mdata_srv_uri?this.m_mdata_srv_uri:"",this.m_cast_name?this.m_cast_name:"",this.m_passwd_plain?this.m_passwd_plain:"")};neoip.casti_ctrl_t.prototype._refresh_timeout_cb=function(){var A=this.m_webdetect_uri+"/neoip_casti_ctrl_wpage_jsrest.js";this.m_refresh_xdomrpc=new neoip.xdomrpc_t(A,neoip.xdomrpc_cb_t(this._xdomrpc_cb,this),"request_stream",this.m_mdata_srv_uri?this.m_mdata_srv_uri:"",this.m_cast_name?this.m_cast_name:"",this.m_passwd_plain?this.m_passwd_plain:"",this.m_httpi_uri?this.m_httpi_uri:"",this.m_httpi_mod?this.m_httpi_mod:"",this.m_http_peersrc_uri?this.m_httpi_peersrc_uri:"")};neoip.casti_ctrl_t.prototype._xdomrpc_cb=function(D,F,E,C){this.m_refresh_xdomrpc.destructor();this.m_refresh_xdomrpc=null;this.m_refresh_timeout=setTimeout(neoip.basic_cb_t(this._refresh_timeout_cb,this),this.m_refresh_delay*1000);var B=this.m_swarm_state;if(E){this.m_swarm_state="error due to "+E.string}else{if(C==""){this.m_passwd_hash=C;this.m_swarm_state="starting"}else{this.m_passwd_hash=C;this.m_swarm_state="started"}}if(this.m_swarm_state!=B){if(this.m_callback){var A={old_state:B,new_state:this.m_swarm_state};this.m_callback("changed_state",A)}}};neoip.casti_ctrl_cb_t=function(A,D,C){var B=D||window;return function(F,E){A.call(B,this,C,F,E)}};var neoip_base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",encode_safe:function(C){var A="";var J,H,F,I,G,E,D;var B=0;C=this._utf8_encode(C);while(B<C.length){J=C.charCodeAt(B++);H=C.charCodeAt(B++);F=C.charCodeAt(B++);I=J>>2;G=((J&3)<<4)|(H>>4);E=((H&15)<<2)|(F>>6);D=F&63;if(isNaN(H)){E=D=64}else{if(isNaN(F)){D=64}}A=A+this._keyStr.charAt(I)+this._keyStr.charAt(G)+this._keyStr.charAt(E)+this._keyStr.charAt(D)}return A},decode_safe:function(C){var A="";var J,H,F;var I,G,E,D;var B=0;C=C.replace(/[^A-Za-z0-9\-\_\=]/g,"");while(B<C.length){I=this._keyStr.indexOf(C.charAt(B++));G=this._keyStr.indexOf(C.charAt(B++));E=this._keyStr.indexOf(C.charAt(B++));D=this._keyStr.indexOf(C.charAt(B++));J=(I<<2)|(G>>4);H=((G&15)<<4)|(E>>2);F=((E&3)<<6)|D;A=A+String.fromCharCode(J);if(E!=64){A=A+String.fromCharCode(H)}if(D!=64){A=A+String.fromCharCode(F)}}A=this._utf8_decode(A);return A},_utf8_encode:function(B){B=B.replace(/\r\n/g,"\n");var A="";for(var D=0;D<B.length;D++){var C=B.charCodeAt(D);if(C<128){A+=String.fromCharCode(C)}else{if((C>127)&&(C<2048)){A+=String.fromCharCode((C>>6)|192);A+=String.fromCharCode((C&63)|128)}else{A+=String.fromCharCode((C>>12)|224);A+=String.fromCharCode(((C>>6)&63)|128);A+=String.fromCharCode((C&63)|128)}}}return A},_utf8_decode:function(A){var B="";var C=0;var D=c1=c2=0;while(C<A.length){D=A.charCodeAt(C);if(D<128){B+=String.fromCharCode(D);C++}else{if((D>191)&&(D<224)){c2=A.charCodeAt(C+1);B+=String.fromCharCode(((D&31)<<6)|(c2&63));C+=2}else{c2=A.charCodeAt(C+1);c3=A.charCodeAt(C+2);B+=String.fromCharCode(((D&15)<<12)|((c2&63)<<6)|(c3&63));C+=3}}}return B}};if(typeof neoip=="undefined"){var neoip={}}neoip.core_t=function(){};neoip.core=new neoip.core_t();neoip.core.isIE=(navigator.appName.indexOf("Microsoft")!=-1);neoip.core_t.prototype.object_clone=function(A,D){if(typeof (A)!="object"){return A}if(A==null){return A}var C=new Object();if(D==true){for(var B in A){C[B]=neoip.object_clone(A[B],D)}}else{for(var B in A){C[B]=A[B]}}return C};neoip.core_t.prototype.build_nonce_str=function(A){var D="";for(var C=0;C<A;C++){var B=Math.floor(Math.random()*(26+26+10));if(B<26){D+=String.fromCharCode(B+"A".charCodeAt(0))}else{if(B<(26+26)){D+=String.fromCharCode(B-(26)+"a".charCodeAt(0))}else{D+=String.fromCharCode(B-(26+26)+"0".charCodeAt(0))}}}return D};neoip.core_t.prototype.dom_event_listener=function(B,C,A){if(B.addEventListener){B.addEventListener(C,A,false);return true}else{if(B.attachEvent){return B.attachEvent("on"+C,A)}else{return false}}};neoip.basic_cb_t=function(A,C){var B=C||window;return function(){A.call(B)}};neoip.core_t.prototype.build_xmlhttp_obj=function(){var A=null;try{A=new ActiveXObject("Msxml2.XMLHTTP")}catch(B){try{A=new ActiveXObject("Microsoft.XMLHTTP")}catch(B){A=null}}if(A==null){A=new XMLHttpRequest()}return A};neoip.core_t.prototype.download_file_insync=function(B,A){var C=this.build_xmlhttp_obj();if(A==true){B+=B.indexOf("?")==-1?"?":"&";B+="nocache_workaround="+Math.floor(Math.random()*999999)}C.open("GET",B,false);C.send(null);if(C.status!=200){return null}return C.responseText};neoip.core_t.prototype.cookie_write=function(B,C,F,D){var E=B+"="+C;if(F){var A=new Date();A.setTime(A.getTime()+(F*24*60*60*1000));E+="; expires="+A.toGMTString()}if(D==null){D=window.location.pathname}E+="; path="+D;document.cookie=E};neoip.core_t.prototype.cookie_read=function(B){var D=B+"=";var A=document.cookie.split(";");for(var C=0;C<A.length;C++){var E=A[C];while(E.charAt(0)==" "){E=E.substring(1,E.length)}if(E.indexOf(D)==0){return E.substring(D.length,E.length)}}return null};neoip.core_t.prototype.cookie_delete=function(A){createCookie(A,"",-1)};neoip.core_t.prototype.doc_urivar_get=function(A){var C=window.location.search.substring(1);var E=C.split("&");for(var B=0;B<E.length;B++){var D=E[B].split("=");if(D[0]==A){return D[1]}}return null};neoip.core_t.prototype.is_absolute_uri=function(A){if(/^http:\/\//.test(A)){return true}if(/^https:\/\//.test(A)){return true}if(/^ftp:\/\//.test(A)){return true}return false};neoip.core_t.prototype.is_absolute_path=function(A){if(/^\//.test(A)){return true}return false};neoip.core_t.prototype.dirname=function(A){return A.replace(/([^\/]*)$/,"")};neoip.core_t.prototype.to_absolute_uri=function(A){if(this.is_absolute_uri(A)){return A}if(this.is_absolute_path(A)){var D=/(.*:\/\/.*?)\//(location.href);var C=D[1];return C+A}var B=location.href;B=B.substring(0,B.lastIndexOf("/"));while(/^\.\./.test(A)){B=B.substring(0,B.lastIndexOf("/"));A=A.substring(3)}return B+"/"+A};neoip.core_t.prototype.doscramble_uri=function(C){if(1){return C}else{if(/.*?:\/\/.*?\//.test(C)==false){return C}var B=/(.*?:\/\/.*?)\//(C)[1];var A=/.*?:\/\/.*?\/(.*)/(C)[1];A=neoip_base64.encode_safe(A);return B+"/scrambled/"+A}};if(typeof neoip=="undefined"){var neoip={}}neoip.xdomrpc_t=function(G,A,C,M,L,K,J,I,H,F,E,D,B){this.m_obj_id=neoip_xdomrpc_cb_new_obj_id();this.m_callback=A;this.m_rpc_url=G;this.m_expire_delay=10*1000;this.m_expire_timeout=setTimeout(neoip.basic_cb_t(this._expire_timeout_cb,this),this.m_expire_delay);neoip_xdomrpc_cb_doregister(this);var N=this.m_rpc_url;N+="?obj_id="+this.m_obj_id;N+="&js_callback=neoip_xdomrpc_cb_callback_from_server";N+="&method_name="+escape(C);if(M!=null){N+="&arg0="+escape(M)}if(L!=null){N+="&arg1="+escape(L)}if(K!=null){N+="&arg2="+escape(K)}if(J!=null){N+="&arg3="+escape(J)}if(I!=null){N+="&arg4="+escape(I)}if(H!=null){N+="&arg5="+escape(H)}if(F!=null){N+="&arg6="+escape(F)}if(E!=null){N+="&arg7="+escape(E)}if(D!=null){N+="&arg8="+escape(D)}if(B!=null){N+="&arg9="+escape(B)}if(0){this._call_uri=N}else{this._call_uri=neoip.core.doscramble_uri(N)}this.m_zerotimer_init=setTimeout(neoip.basic_cb_t(this._zerotimer_init_cb,this),0)};neoip.xdomrpc_t.prototype.destructor=function(){if(this.m_zerotimer_init){clearTimeout(this.m_zerotimer_init)}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout)}neoip_xdomrpc_cb_unregister(this);var A="neoip_xdomrpc_script_"+this.m_obj_id;if(neoip.core.isIE){this._dtor_all_script_4ie(A)}else{this._dtor_all_script_dfl(A)}};neoip.xdomrpc_t.prototype._zerotimer_init_cb=function(){var B=this._call_uri;clearTimeout(this.m_zerotimer_init);this.m_zerotimer_init=null;var D=this._get_root_elem();var C="neoip_xdomrpc_script_"+this.m_obj_id;var E="neoip_xdomrpc_script_reply_var_"+this.m_obj_id;var A=document.createElement("script");A.setAttribute("id",C+"_pre");A.text="var "+E+"=null;";D.appendChild(A);var A=document.createElement("script");A.setAttribute("src",B);A.setAttribute("id",C+"_call");D.appendChild(A);if(neoip.core.isIE){this._ctor_post_script_4ie(A,C)}else{this._ctor_post_script_dfl(A,C)}};neoip.xdomrpc_t.prototype._get_root_elem=function(){if(0){var A=document.getElementById("neoip.xdomrpc_temp_div");if(!A){A=document.createElement("div");A.setAttribute("id","neoip.xdomrpc_temp_div");document.body.appendChild(A)}}else{var A=document.getElementsByTagName("head")[0]}return A};neoip.xdomrpc_t.prototype._ctor_post_script_dfl=function(B,D){var C=this._get_root_elem();var A=document.createElement("script");A.setAttribute("id",D+"_post");A.text="neoip_xdomrpc_cb_callback_from_server("+this.m_obj_id+");";C.appendChild(A)};neoip.xdomrpc_t.prototype._dtor_all_script_dfl=function(B){var A=this._get_root_elem();try{A.removeChild(document.getElementById(B+"_pre"))}catch(C){}try{A.removeChild(document.getElementById(B+"_call"))}catch(C){}try{A.removeChild(document.getElementById(B+"_post"))}catch(C){}};neoip.xdomrpc_t.prototype._ctor_post_script_4ie=function(B,C){var A=function(E){var D=E;return function(){if(this.readyState==null||this.readyState=="loaded"||this.readyState=="complete"){neoip_xdomrpc_cb_callback_from_server(D)}}};B.onreadystatechange=A(this.m_obj_id);B.onload=A(this.m_obj_id)};neoip.xdomrpc_t.prototype._dtor_all_script_4ie=function(B){var A=this._get_root_elem();var C=function(E,H,G){var I=E;var F=H;var D=G;return function(){var K=document.getElementById(I);var J=K.readyState;if(J!=null&&J!="loaded"&&J!="complete"){setTimeout(D(I,F,D),1*1000);return }try{F.removeChild(K)}catch(L){}}};setTimeout(C(B+"_pre",A,C),0);setTimeout(C(B+"_call",A,C),0)};neoip.xdomrpc_t.prototype._expire_timeout_cb=function(){clearInterval(this.m_expire_timeout);this.m_expire_timeout=null;var A={code:-1,string:"expired after "+this.m_expire_delay};this.callback_cb(this.m_obj_id,A,null)};neoip.xdomrpc_t.prototype.callback_cb=function(A,C,B){if(this.m_callback){this.m_callback(C,B)}else{this.destructor()}};neoip.xdomrpc_cb_t=function(A,D,C){var B=D||window;return function(F,E){A.call(B,this,C,F,E)}};var neoip_xdomrpc_cb_arr=new Array();function neoip_xdomrpc_cb_new_obj_id(B){var A;do{A=Math.floor(Math.random()*65536)}while(neoip_xdomrpc_cb_arr[A]!=null);return A}function neoip_xdomrpc_cb_doregister(A){neoip_xdomrpc_cb_arr[A.m_obj_id]=A}function neoip_xdomrpc_cb_unregister(A){delete neoip_xdomrpc_cb_arr[A.m_obj_id]}function neoip_xdomrpc_cb_callback_from_server(obj_id){var reply=eval("neoip_xdomrpc_script_reply_var_"+obj_id);var obj=neoip_xdomrpc_cb_arr[obj_id];if(obj==null){return }eval("delete neoip_xdomrpc_script_reply_var_"+obj_id);if(reply==null){obj.callback_cb(obj_id,{code:-1,string:"Server Unreachable"},null);return }obj.callback_cb(obj_id,reply.fault,reply.returned_val)}if(typeof neoip=="undefined"){var neoip={}}neoip.apps_detect_t=function(C,B,A,E){this.m_callback=E;this.m_suffix_name=C;this.m_first_port=B;this.m_last_port=A;this.m_max_concurrent=1;this.m_expire_delay=10*1000;this.m_expire_timeout=setTimeout(neoip.basic_cb_t(this._expire_timeout_cb,this),this.m_expire_delay);this.m_xdomrpc_arr=[];for(var D=this.m_first_port;D<=this.m_last_port;D++){this.m_xdomrpc_arr[D]="todo"}this._launch_next_probe()};neoip.apps_detect_t.prototype.destructor=function(){for(var A in this.m_xdomrpc_arr){if(typeof (this.m_xdomrpc_arr[A])!="object"){continue}this.m_xdomrpc_arr[A].destructor();this.m_xdomrpc_arr[A]=null}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout);this.m_expire_timeout=null}};neoip.apps_detect_t.prototype.suffix_name=function(){return this.m_suffix_name};neoip.apps_detect_t.prototype.first_port=function(){return this.m_first_port};neoip.apps_detect_t.prototype.last_port=function(){return this.m_last_port};neoip.apps_detect_t.prototype._launch_next_probe=function(){var E=0;var B=0;for(var A in this.m_xdomrpc_arr){if(this.m_xdomrpc_arr[A]=="done"){B++}if(typeof (this.m_xdomrpc_arr[A])=="object"){E++}}if(B==(this.m_last_port-this.m_first_port+1)){var C={"present":false};neoip_apps_detect_arr[this.m_suffix_name]=C;if(this.m_callback){this.m_callback("absent")}return }for(var A in this.m_xdomrpc_arr){if(this.m_xdomrpc_arr[A]!="todo"){continue}if(E>=this.m_max_concurrent){break}var D="http://127.0.0.1:"+A+"/neoip_"+this.m_suffix_name+"_appdetect_jsrest.js";this.m_xdomrpc_arr[A]=new neoip.xdomrpc_t(D,neoip.xdomrpc_cb_t(this._xdomrpc_cb,this,A),"probe_apps");E++}};neoip.apps_detect_t.prototype._xdomrpc_cb=function(B,E,D,A){var C=E;this.m_xdomrpc_arr[C].destructor();this.m_xdomrpc_arr[C]="done";if(D==null){var F={};F.outter_uri="http://127.0.0.1:"+C;F.version=A;F.present=true;neoip_apps_detect_arr[this.m_suffix_name]=F;if(this.m_callback){this.m_callback("found")}return }this._launch_next_probe()};neoip.apps_detect_t.prototype._expire_timeout_cb=function(){neoip_apps_detect_arr[this.m_suffix_name]={"present":false};if(this.m_callback){this.m_callback("expired after "+this.m_expire_delay+"-msec")}};neoip.apps_detect_cb_t=function(A,D,C){var B=D||window;return function(E){A.call(B,this,C,E)}};var neoip_apps_detect_arr=new Array();neoip.apps_present=function(A){if(neoip_apps_detect_arr[A]==null){return false}return neoip_apps_detect_arr[A].present};neoip.apps_version=function(A){console.assert(neoip.apps_present(A));return neoip_apps_detect_arr[A].version};neoip.apps_version_check=function(B,F){var D=neoip_apps_detect_arr[B].version;var G=parseInt(D.split(".")[0],10);var E=parseInt(F.split(".")[0],10);if(G<E){return false}var C=parseInt(D.split(".")[1],10);var A=parseInt(F.split(".")[1],10);if(C<A){return false}return true};neoip.outter_uri=function(A){console.assert(neoip.apps_present(A));return neoip_apps_detect_arr[A].outter_uri}