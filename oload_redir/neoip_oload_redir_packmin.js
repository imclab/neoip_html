var names=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var i=0;i<names.length;++i){window.console[names[i]]=function(){}}if(typeof neoip=="undefined"){var neoip={}}neoip.core_t=function(){};neoip.core=new neoip.core_t();neoip.core_t.prototype.object_clone=function(A,D){if(typeof (A)!="object"){return A}if(A==null){return A}var C=new Object();if(D==true){for(var B in A){C[B]=neoip.object_clone(A[B],D)}}else{for(var B in A){C[B]=A[B]}}return C};neoip.core_t.prototype.build_nonce_str=function(A){var D="";for(var C=0;C<A;C++){var B=Math.floor(Math.random()*(26+26+10));if(B<26){D+=String.fromCharCode(B+"A".charCodeAt(0))}else{if(B<(26+26)){D+=String.fromCharCode(B-(26)+"a".charCodeAt(0))}else{D+=String.fromCharCode(B-(26+26)+"0".charCodeAt(0))}}}return D};objembed_wait4init=function(html_id,fct_str,cur_delay,max_delay,callback){var embed_elem=document.getElementById(html_id);if(embed_elem==undefined||eval("typeof(embed_elem."+fct_str+")")!="function"){var next_delay=cur_delay*2;next_delay=Math.min(next_delay,max_delay);var timeout_cb=function(){objembed_wait4init(html_id,fct_str,next_delay,max_delay,callback)};setTimeout(timeout_cb,cur_delay,this);return }callback()};neoip.core_t.prototype.dom_event_listener=function(B,C,A){if(B.addEventListener){B.addEventListener(C,A,false);return true}else{if(B.attachEvent){return B.attachEvent("on"+C,A)}else{return false}}};neoip.basic_cb_t=function(A,C){var B=C||window;return function(){A.call(B)}};neoip.core_t.prototype.download_file_insync=function(B,A){var C=new XMLHttpRequest();if(A==true){B+=B.indexOf("?")==-1?"?":"&";B+="nocache_workaround="+Math.floor(Math.random()*999999)}C.open("GET",B,false);C.send(null);if(C.status!=200){return null}return C.responseText};neoip.core_t.prototype.cookie_write=function(B,C,F,D){var E=B+"="+C;if(F){var A=new Date();A.setTime(A.getTime()+(F*24*60*60*1000));E+="; expires="+A.toGMTString()}if(D==null){D=window.location.pathname}E+="; path="+D;document.cookie=E};neoip.core_t.prototype.cookie_read=function(B){var D=B+"=";var A=document.cookie.split(";");for(var C=0;C<A.length;C++){var E=A[C];while(E.charAt(0)==" "){E=E.substring(1,E.length)}if(E.indexOf(D)==0){return E.substring(D.length,E.length)}}return null};neoip.core_t.prototype.cookie_delete=function(A){createCookie(A,"",-1)};neoip.core_t.prototype.doc_urivar_get=function(A){var C=window.location.search.substring(1);var E=C.split("&");for(var B=0;B<E.length;B++){var D=E[B].split("=");if(D[0]==A){return D[1]}}return null};neoip.core_t.prototype.is_absolute_uri=function(A){if(/^http:\/\//.test(A)){return true}if(/^https:\/\//.test(A)){return true}if(/^ftp:\/\//.test(A)){return true}return false};neoip.core_t.prototype.is_absolute_path=function(A){if(/^\//.test(A)){return true}return false};neoip.core_t.prototype.to_absolute_uri=function(A){if(this.is_absolute_uri(A)){return A}if(this.is_absolute_path(A)){var D=/(.*:\/\/.*?)\//(location.href);var C=D[1];return C+A}var B=location.href;B=B.substring(0,B.lastIndexOf("/"));while(/^\.\./.test(A)){B=B.substring(0,B.lastIndexOf("/"));A=A.substring(3)}return B+"/"+A};neoip.core_t.prototype.doscramble_uri=function(C){if(1){return C}else{if(/.*?:\/\/.*?\//.test(C)==false){return C}var B=/(.*?:\/\/.*?)\//(C)[1];var A=/.*?:\/\/.*?\/(.*)/(C)[1];A=neoip_base64.encode_safe(A);return B+"/scrambled/"+A}};var neoip_base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",encode_safe:function(C){var A="";var J,H,F,I,G,E,D;var B=0;C=this._utf8_encode(C);while(B<C.length){J=C.charCodeAt(B++);H=C.charCodeAt(B++);F=C.charCodeAt(B++);I=J>>2;G=((J&3)<<4)|(H>>4);E=((H&15)<<2)|(F>>6);D=F&63;if(isNaN(H)){E=D=64}else{if(isNaN(F)){D=64}}A=A+this._keyStr.charAt(I)+this._keyStr.charAt(G)+this._keyStr.charAt(E)+this._keyStr.charAt(D)}return A},decode_safe:function(C){var A="";var J,H,F;var I,G,E,D;var B=0;C=C.replace(/[^A-Za-z0-9\-\_\=]/g,"");while(B<C.length){I=this._keyStr.indexOf(C.charAt(B++));G=this._keyStr.indexOf(C.charAt(B++));E=this._keyStr.indexOf(C.charAt(B++));D=this._keyStr.indexOf(C.charAt(B++));J=(I<<2)|(G>>4);H=((G&15)<<4)|(E>>2);F=((E&3)<<6)|D;A=A+String.fromCharCode(J);if(E!=64){A=A+String.fromCharCode(H)}if(D!=64){A=A+String.fromCharCode(F)}}A=this._utf8_decode(A);return A},_utf8_encode:function(B){B=B.replace(/\r\n/g,"\n");var A="";for(var D=0;D<B.length;D++){var C=B.charCodeAt(D);if(C<128){A+=String.fromCharCode(C)}else{if((C>127)&&(C<2048)){A+=String.fromCharCode((C>>6)|192);A+=String.fromCharCode((C&63)|128)}else{A+=String.fromCharCode((C>>12)|224);A+=String.fromCharCode(((C>>6)&63)|128);A+=String.fromCharCode((C&63)|128)}}}return A},_utf8_decode:function(A){var B="";var C=0;var D=c1=c2=0;while(C<A.length){D=A.charCodeAt(C);if(D<128){B+=String.fromCharCode(D);C++}else{if((D>191)&&(D<224)){c2=A.charCodeAt(C+1);B+=String.fromCharCode(((D&31)<<6)|(c2&63));C+=2}else{c2=A.charCodeAt(C+1);c3=A.charCodeAt(C+2);B+=String.fromCharCode(((D&15)<<12)|((c2&63)<<6)|(c3&63));C+=3}}}return B}};if(typeof neoip=="undefined"){var neoip={}}neoip.nested_uri_builder_t=function(){this.m_dupuri_arr=new Array;this.m_var_arr=new Array};neoip.nested_uri_builder_t.prototype.inner_uri=function(A){this.m_inner_uri=neoip.core.to_absolute_uri(A)};neoip.nested_uri_builder_t.prototype.outter_uri=function(A){this.m_outter_uri=A};neoip.nested_uri_builder_t.prototype.set_var=function(A,B){if(A=="dupuri"){this.m_dupuri_arr.push(B)}else{if(A=="subfile_path"){this.m_var_arr["subfile_level"]=B.split("/").length-1;this.m_subfile_path=B}else{this.m_var_arr[A]=B}}};neoip.nested_uri_builder_t.prototype.set_var_arr=function(A){for(var B in A){this.set_var(B,A[B])}};neoip.nested_uri_builder_t.prototype._is_sane_internal=function(){if(!this.m_outter_uri){throw new Error("No outter_uri")}if(!this.m_inner_uri){throw new Error("No inner_uri")}};neoip.nested_uri_builder_t.prototype.is_sane=function(){try{this._is_sane_internal()}catch(A){return false}return true};neoip.nested_uri_builder_t.prototype.to_string=function(){var A="";console.assert(this.is_sane());A+=this.m_outter_uri+"/";if(this.m_var_arr["mod"]){A+=this.m_var_arr["mod"]+"/"}for(var B in this.m_var_arr){if(B=="mod"){continue}if(B.indexOf("neoip_metavar_")==0){continue}A+="*"+B+"*";if(B=="http_peersrc_uri"){A+=neoip_base64.encode_safe(this.m_var_arr[B])}else{A+=this.m_var_arr[B]}A+="/"}for(var C in this.m_dupuri_arr){A+="*dupuri*";A+=neoip_base64.encode_safe(this.m_dupuri_arr[C]);A+="/"}var D=this.m_inner_uri.indexOf("?");if(D!=-1){A+=this.m_inner_uri.substr(0,D)}else{A+=this.m_inner_uri}if(this.m_subfile_path){A+=this.m_subfile_path}if(D!=-1){A+=this.m_inner_uri.substr(D,this.m_inner_uri.length)}for(var B in this.m_var_arr){if(B.indexOf("neoip_metavar_")!=0){continue}A+=A.indexOf("?")==-1?"?":"&";A+=B+"="+escape(this.m_var_arr[B])}A=neoip.core.doscramble_uri(A);return A};if(typeof neoip=="undefined"){var neoip={}}neoip.xdomrpc_t=function(G,A,C,M,L,K,J,I,H,F,E,D,B){this.m_obj_id=neoip_xdomrpc_cb_new_obj_id();this.m_callback=A;this.m_rpc_url=G;this.m_expire_delay=10;this.m_expire_timeout=setTimeout(function(O){O._expire_timeout_cb()},this.m_expire_delay*1000,this);neoip_xdomrpc_cb_doregister(this);var N=this.m_rpc_url;N+="?obj_id="+this.m_obj_id;N+="&js_callback=neoip_xdomrpc_cb_callback_from_server";N+="&method_name="+escape(C);if(M!=null){N+="&arg0="+escape(M)}if(L!=null){N+="&arg1="+escape(L)}if(K!=null){N+="&arg2="+escape(K)}if(J!=null){N+="&arg3="+escape(J)}if(I!=null){N+="&arg4="+escape(I)}if(H!=null){N+="&arg5="+escape(H)}if(F!=null){N+="&arg6="+escape(F)}if(E!=null){N+="&arg7="+escape(E)}if(D!=null){N+="&arg8="+escape(D)}if(B!=null){N+="&arg9="+escape(B)}if(0){this._call_uri=N}else{this._call_uri=neoip.core.doscramble_uri(N)}this.m_zerotimer_init=setTimeout(function(O){O._zerotimer_init_cb()},0*1000,this)};neoip.xdomrpc_t.prototype.destructor=function(){if(this.m_zerotimer_init){clearTimeout(this.m_zerotimer_init)}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout)}neoip_xdomrpc_cb_unregister(this);var A=document.getElementById("neoip.xdomrpc_temp_div");var B="neoip_xdomrpc_script_"+this.m_obj_id;try{A.removeChild(document.getElementById(B+"_pre"))}catch(C){}try{A.removeChild(document.getElementById(B+"_call"))}catch(C){}try{A.removeChild(document.getElementById(B+"_post"))}catch(C){}};neoip.xdomrpc_t.prototype._zerotimer_init_cb=function(){var C=this._call_uri;clearTimeout(this.m_zerotimer_init);this.m_zerotimer_init=null;var D=document.getElementById("neoip.xdomrpc_temp_div");if(!D){D=document.createElement("div");D.setAttribute("id","neoip.xdomrpc_temp_div");document.body.appendChild(D)}var E="neoip_xdomrpc_script_"+this.m_obj_id;var F="neoip_xdomrpc_script_reply_var_"+this.m_obj_id;var A=document.createElement("script");A.setAttribute("id",E+"_pre");A.appendChild(document.createTextNode(F+"=null;"));D.appendChild(A);var A=document.createElement("script");A.setAttribute("src",C);A.setAttribute("id",E+"_call");D.appendChild(A);var A=document.createElement("script");var B="neoip_xdomrpc_cb_callback_from_server("+this.m_obj_id+", "+F+");\ndelete "+F+";\n";A.setAttribute("id",E+"_post");A.appendChild(document.createTextNode(B));D.appendChild(A)};neoip.xdomrpc_t.prototype._expire_timeout_cb=function(){clearInterval(this.m_expire_timeout);this.m_expire_timeout=null;var A={code:-1,string:"expired after "+this.m_expire_delay};this.callback_cb(this.m_obj_id,A,null)};neoip.xdomrpc_t.prototype.callback_cb=function(A,C,B){if(this.m_callback){this.m_callback(C,B)}else{this.destructor()}};neoip.xdomrpc_cb_t=function(A,D,C){var B=D||window;return function(F,E){A.call(B,this,C,F,E)}};var neoip_xdomrpc_cb_arr=new Array();neoip_xdomrpc_cb_new_obj_id=function(B){var A;do{A=Math.floor(Math.random()*65536)}while(neoip_xdomrpc_cb_arr[A]);return A};neoip_xdomrpc_cb_doregister=function(A){neoip_xdomrpc_cb_arr[A.m_obj_id]=A};neoip_xdomrpc_cb_unregister=function(A){delete neoip_xdomrpc_cb_arr[A.m_obj_id]};neoip_xdomrpc_cb_callback_from_server=function(A,B){var C=neoip_xdomrpc_cb_arr[A];if(B==null){C.callback_cb(A,{code:-1,string:"Server Unreachable"},null);return }C.callback_cb(A,B.fault,B.returned_val)};if(typeof neoip=="undefined"){var neoip={}}neoip.apps_detect_t=function(C,B,A,D){this.m_callback=D;this.m_suffix_name=C;this.m_first_port=B;this.m_last_port=A;this.m_probe_xdomrpc=null;this.m_expire_delay=10;this.m_expire_timeout=setTimeout(function(E){E._expire_timeout_cb()},this.m_expire_delay*1000,this);this.m_current_port=this.m_first_port;this._launch_probe()};neoip.apps_detect_t.prototype.destructor=function(){if(this.m_probe_xdomrpc){this.m_probe_xdomrpc.destructor();this.m_probe_xdomrpc=null}if(this.m_expire_timeout){clearTimeout(this.m_expire_timeout);this.m_expire_timeout=null}};neoip.apps_detect_t.prototype.suffix_name=function(){return this.m_suffix_name};neoip.apps_detect_t.prototype.first_port=function(){return this.m_first_port};neoip.apps_detect_t.prototype.last_port=function(){return this.m_last_port};neoip.apps_detect_t.prototype._launch_probe=function(){var A="http://127.0.0.1:"+this.m_current_port+"/neoip_"+this.m_suffix_name+"_appdetect_jsrest.js";this.m_probe_xdomrpc=new neoip.xdomrpc_t(A,neoip.xdomrpc_cb_t(this._xdomrpc_cb,this),"probe_apps")};neoip.apps_detect_t.prototype._xdomrpc_cb=function(B,D,C,A){this.m_probe_xdomrpc.destructor();this.m_probe_xdomrpc=null;if(C==null){var E={};E.outter_uri="http://127.0.0.1:"+this.m_current_port;E.version=A;E.present=true;neoip_apps_detect_arr[this.m_suffix_name]=E;if(this.m_callback){this.m_callback("found")}return }if(this.m_current_port==this.m_last_port){var E={"present":false};neoip_apps_detect_arr[this.m_suffix_name]=E;if(this.m_callback){this.m_callback("absent")}return }this.m_current_port++;this._launch_probe()};neoip.apps_detect_t.prototype._expire_timeout_cb=function(){var A={"present":false};neoip_apps_detect_arr[this.m_suffix_name]=A;if(this.m_callback){this.m_callback("expired after "+this.m_expire_delay+"-sec")}};neoip.apps_detect_cb_t=function(A,D,C){var B=D||window;return function(E){A.call(B,this,C,E)}};var neoip_apps_detect_arr=new Array();neoip.apps_present=function(A){if(neoip_apps_detect_arr[A]==null){return false}return neoip_apps_detect_arr[A].present};neoip.apps_version=function(A){console.assert(neoip.apps_present(A));return neoip_apps_detect_arr[A].version};neoip.outter_uri=function(A){console.assert(neoip.apps_present(A));return neoip_apps_detect_arr[A].outter_uri};if(typeof neoip=="undefined"){var neoip={}}neoip.oload_redir_t=function(){};neoip.oload_redir_t.prototype.destructor=function(){if(this.m_oload_detect){this.m_oload_detect.destructor();this.m_oload_detect=null}};neoip.oload_redir_t.prototype.start=function(B){this.m_inner_uri=B;var A=neoip.apps_detect_cb_t(this._apps_detect_cb,this);this.m_oload_detect=new neoip.apps_detect_t("oload",4550,4559,A)};neoip.oload_redir_t.prototype._apps_detect_cb=function(B,C,D){console.info("enter suffix_name="+B.suffix_name()+" result_str="+D);this.m_oload_detect.destructor();this.m_oload_detect=null;var A=null;if(D!="found"){A=this.m_inner_uri}else{var E=new neoip.nested_uri_builder_t();E.outter_uri(neoip.outter_uri("oload"));E.inner_uri(this.m_inner_uri);A=E.to_string()}}