/**
 * this object is part of the javascript API for UrFastR Player
 * - opt.container: the html id of the container
 *
 * NOTE: it MUST not depends on other libraries
 * - it has an optionnal dependancy on crossframe library
*/
var urfastr_player_jsapi = function(opt){
	// set the default options
	var opt_dfl 	= {
			//player_url	: 'http://player.urfastr.net/live',
			player_url	: "http://localhost/~jerome/neoip_html/player/jsplayer/neoip_ezplayer_widget.html",
			width		: "320",
			height		: "240",
			event_cb	: null,
			neoip_var_arr	:{
					widget_src:		'api_js',
					onload_start_play:	'enabled'
				}
		};

	var frame_id	= "urfastr_live_frame_" + Math.floor(Math.random()*100000);
	var rpc_client	= null;
	var rpc_server	= null;
	var addEventListener_args	= {
			dest_addr: {
				proxyUrl:	opt.crossframe_proxyUrl,
				listener_obj:	"crossframe_msg_rpc_server_"+frame_id,
				iframe_dst:	"parent"
			},
			resp_addr: {
				//proxyUrl:	"http://player.urfastr.net/crossframe_proxy.html",
				proxyUrl:	"http://localhost/~jerome/neoip_html/lib/crossframe/crossframe_proxy.html",
				listener_obj:	"crossframe_msg_event_listener_page",	// <- TODO to change this make a global var in
											// the player iframe, not acceptable
											// change this
				iframe_dst:	"frames['"+frame_id+"']"
			}
		};
		
	var ctor	= function(){
		// in opt, set default if not explicitly set
		for(key in opt_dfl){
			if( opt[key] !== undefined )	continue;
			opt[key]	= opt_dfl[key];
		}
		
		// if crossframe library is not available, return now
		if( typeof crossframe === "undefined" )	return;
		// init the rpc_client
		rpc_client	= new crossframe.rpc_client_t({
			dest_addr: {
				//proxyUrl:	"http://player.urfastr.net/crossframe_proxy.html",
				proxyUrl:	"http://localhost/~jerome/neoip_html/lib/crossframe/crossframe_proxy.html",
				listener_obj:	"crossframe_msg_rpc_server_page",
				iframe_dst:	"frames['"+frame_id+"']"
			},
			resp_addr: {
				proxyUrl:	opt.crossframe_proxyUrl,
				listener_obj:	"crossframe_msg_rpc_client_"+frame_id,
				iframe_dst:	"parent"
			}
		});
		
		// initialize the addEventListener immediatly in the URL
		if( opt.event_cb ){
			_rpc_server_init()
			opt.neoip_var_arr['api_addEventListener']	= JSON.stringify(addEventListener_args);
		}
	}
	
	var _rpc_server_callback= function(event_type, event_args){
		// log to debug
		console.info("99999999999event notified event_type="+event_type);
		console.dir(event_args);
		// notify the event_cb if present
		if( opt.event_cb )	opt.event_cb(event_type, event_args)
	}
	
	var _rpc_server_init	= function(){
		// if it is already initialized, return now
		if( rpc_server )	return;
		// init the object itself
		rpc_server	= new crossframe.rpc_server_t({
			listener_obj:	"crossframe_msg_rpc_server_"+frame_id
		});
		// register the callback
		rpc_server.register("event_notification", _rpc_server_callback);
	}
		
	/**
	 * Build the dom element for UrFastR Player inside opt.container_id
	*/
	var build	= function(){
		// destroy all opt.container_id children
		destroy();

		// convert opt.neoip_var_arr into a list of url variable
		var var_str	= ""
		for(key in opt.neoip_var_arr){
			if( var_str.length )	var_str += "&";
			var_str	+= 'neoip_var_'+ escape(key) + '=' + escape(opt.neoip_var_arr[key]);
		}
		console.info('iframe_src'+var_str);

		// build iframe_src
		var iframe_src	= opt.player_url;
		if(var_str.length)	iframe_src	+= '?' + var_str;
		

		// build the body
		var iframeEl	= document.createElement('iframe');
		iframeEl.setAttribute('src'		, iframe_src	);
		iframeEl.setAttribute('width'		, opt.width	);
		iframeEl.setAttribute('height'		, opt.height	);
		iframeEl.setAttribute('frameborder'	, 'no'		);
		iframeEl.setAttribute('frameborder'	, 'no'		);
		iframeEl.setAttribute('id'		, frame_id	);
		iframeEl.setAttribute('name'		, frame_id	);
	
		// append the iframe to the body
		var containerEl	= document.getElementById(opt.container_id);
		containerEl.appendChild(iframeEl);
	}
	
	/**
	 * destroy all children elements inside opt.container_id
	*/
	var destroy		= function(){
		// get the container element
		var containerEl	= document.getElementById(opt.container_id);
		// iterate until there is no more child
		while( containerEl.hasChildNodes() ){
			containerEl.removeChild( containerEl.lastChild );
		}	
	}

	/**
	 * Add a event listener for iframe events
	*/
	var event_cb_set	= function(p_callback){
		// copy the parameter
		opt.event_cb	= p_callback;
		// initialize rpc_server if not yet done
		if( ! rpc_server ){
			_rpc_server_init()
			// notify the iframe of the callback
			rpc_client.call("addEventListener", addEventListener_args);
		}
	}
	
	/**
	 * Start playing 
	*/
	var playing_start	= function(){
		console.assert(rpc_client);
		rpc_client.call("playing_start");		
	}

	/**
	 * Stop playing 
	*/
	var playing_stop	= function(){
		console.assert(rpc_client);
		rpc_client.call("playing_stop");
	}
	
	/**
	 * is playing 
	*/
	var is_playing	= function(callback){
		console.assert(rpc_client);
		rpc_client.call("is_playing", function(resp_ctx){
			callback(resp_ctx);
		});
	}

	/**
	 * return the plistarr
	*/
	var plistarr_get	= function(callback){
		console.assert(rpc_client);
		rpc_client.call("plistarr_get", function(resp_ctx){
			callback(resp_ctx);
		});
	}

	/**
	 * return the webpack's status
	*/
	var webpack_status	= function(callback){
		console.assert(rpc_client);
		rpc_client.call("webpack_status", function(resp_ctx){
			callback(resp_ctx);
		});
	}

	/**
	 * Change the current playlist
	*/
	var change_playlist	= function(playlist_uid, callback){
		console.assert(rpc_client);
		rpc_client.call("change_playlist", playlist_uid, callback);		
	}
	
	// launch the constructor
	ctor();
	// return public functions and variables
	return {
		build		: build,
		destroy		: destroy,
		event_cb_set	: event_cb_set,
		playing_start	: playing_start,
		playing_stop	: playing_stop,
		is_playing	: is_playing,
		plistarr_get	: plistarr_get,
		webpack_status	: webpack_status,
		change_playlist	: change_playlist
	};
};