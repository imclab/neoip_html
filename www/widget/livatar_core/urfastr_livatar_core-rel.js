/**
 * \par TODO
 * - make it return the number of replaced images
 * 
 * \par TODO (big direction)
 * - make it easy to debug
 * - make it more efficient (especially server side)
 * - make it more pervasive (support as many plateform as possible)
 *
 * \par debug
 * - on which page it this active
 * - do a single core and avoid specifics as much as possible
 * - which images involve a query, and which query
 * - make a dry run option
 *   - avoid to rerun the script many time without reloading the source page
 * - how can i make 2 versions ? dev/prod/test ?
 *   - a preprocessor ala C ?
 * - can i have an automatic testing for this ?
 *   - something like google js testing stuff ?
 *
 * \par efficient
 * - moto: "query server only once per page"
 * - to limit the number of pages and/or image is a way to limit server load
 * - the server load of livatar webservice may be negligible compared to video streaming
 * - make it easy to determine which image/page trigger a query
 * - livatar core: group all the images query into on server query
 *   - build an global array of query
 *     query_str: function(result){}
 *   - then process this in a global fashion
 * - livatar websrv: support multiple query in a single call 
 * 
 * \par pervasive
 * - chrome extension/mozilla jetpack/greasemonkey
 * - how to build them
 *   - automatic with makefile
 * - where to store them
 *   - close to the other widgets aka www/widgets/
 *   - widget/livatar_core
 *   - widget/livatar_jetpack
 *   - widget/livatar_chrome
 *   - widget/livatar_greasemonkey
 * - what are the good names for it
 * - currenlty there is already stuff close to this script
 *   - pipjs/firefox extension/greasemonkey 
 *   - do i make this completly distinct from livatar script or not ?
 *   - To bundle them would increase the value by providing more features per install
 *   - i dont know how to do those bundles and what to bundle
 *     - so impossible for now 
*/




function livatar_post_jquery($){
			var livatar_dbg		= null;
		/********************************************************************************/
	/*		query_queue stuff						*/
	/********************************************************************************/
	var query_queue_arr	= [];
	var query_queue_add		= function(query_str, callback)
	{
		query_queue_arr.push({
			query_str	: query_str,
			callback	: callback
		});
	}
	var query_queue_process	= function()
	{
		// if query_queue_arr is empty, return now
		if( query_queue_arr.length == 0 )	return;
		
		// build the query_arr
		query_arr	= [];
		for(var i = 0; i < query_queue_arr.length; i++){
			query_arr.push(query_queue_arr[i]['query_str']);
		}
		var query_url	= "http://api.urfastr.net/livatarAPI?format=jsonp&qs="+escape(query_arr.join(','));
		// fetch the iframe_url
		$.get(query_url, {}, function(player_urls){
			// loop over player_urls responses
			for(var i = 0; i < player_urls.length; i++){
				var callback	= query_queue_arr[i]['callback'];
				var player_url	= player_urls[i];
				// call the callback with the response
				callback(player_url);
			}
						// free the array
			query_queue_arr	= [];	
		}, "jsonp");
	}
	
	/********************************************************************************/
	/*										*/
	/********************************************************************************/
	var replace_by_iframe	= function(container, iframe_url, iframe_w, iframe_h){	
		// build the iframe element
		var iframeEl = document.createElement("iframe");
		iframeEl.setAttribute("src"		, iframe_url	);
		iframeEl.setAttribute('width'		, iframe_w	);
		iframeEl.setAttribute('height'		, iframe_h	);
		iframeEl.setAttribute('frameborder'	, "0"		);	
	
		// empty the container
		$(container).empty();
		// append the iframe inside it
		$(container).append(iframeEl);
	}
	
	/********************************************************************************/
	/*		Handle Twitter 							*/	
	/********************************************************************************/
	var twitter_replace_username	= function(container, imageEl, username)
	{
		// get iframe_w/iframe_h
		var iframe_w	= $(imageEl).attr('width');
		var iframe_h	= $(imageEl).attr('height');
		
		// build livaterAPI call
		var query_str	= "twitter/username/"+username;

		// queue this query
		query_queue_add(query_str, function(iframe_url){
						if( !iframe_url )	return;
			replace_by_iframe(container, iframe_url, iframe_w, iframe_h);
		});
	}
	var twitter_process_profile	= function(){
		// debug code
				var imageEl	= $("img#profile-image");	// http://twitter.com/jerome_etienne		
		var container	= imageEl.parents('a');		
		// get the username
		var href	= $(container).attr('href');
		var username	= href.match(/\/account\/profile_image\/([a-zA-Z0-9_-]+)/)[1];
		
		return twitter_replace_username(container, imageEl, username);
	}

	var twitter_process_home	= function(){
		// debug code
				// collect all the username
		var usernames	= {};
		$('ol#timeline li.hentry.status').each(function(){
			var element	= this;
			var matches	= $(element).attr('class').match(/u-([\w+]+)/);
			var username	= matches[1];
			// if username already is in usernames, return now
			if( usernames[username] )	return;
			// add this element in usernames
			usernames[username]	= element;
		});
		// log to debug
		
		
		// got thru each username		
		for(username in usernames){
			var element	= usernames[username];
			var container	= $(element).find('a:first');
			var imageEl	= $(container).find('img');
			twitter_replace_username(container, imageEl, username);
		}
	}
	var twitter_process_followers	= function(){
				// collect all the username
		$('table.followers-table tr.vcard td.thumb a[rel=contact]').each(function(){
			var container	= this;
			var imageEl	= $(container).find('img');
			var href	= $(container).attr('href');
			var tmp		= href.split('/');
			var username	= tmp[tmp.length-1];
			//
			twitter_replace_username(container, imageEl, username);
		});
	}

	var twitter_process	= function(){
		var pathname	= location.pathname;
		if( pathname == '/' )
			return twitter_process_home();
	
		var tmp		= pathname.split('/');
		if( tmp.length == 2 && tmp[0] == "" && tmp[1] == "followers" )		
			return twitter_process_followers();
		if( tmp.length == 2 && tmp[0] == "" && tmp[1] != "" )
			return twitter_process_profile();
		if( tmp.length == 3 && tmp[2] == "followers" )
			return twitter_process_followers();
		return null;
	}


	/********************************************************************************/
	/*		Handle identi.ca						*/	
	/********************************************************************************/
	var identica_replace_username	= function(container, imageEl, username)
	{
		// get iframe_w/iframe_h
		var iframe_w	= $(imageEl).attr('width');
		var iframe_h	= $(imageEl).attr('height');
		// build livaterAPI call
		var query_str	= "identica/username/"+username;
		// queue this query
		query_queue_add(query_str, function(iframe_url){
						if( !iframe_url )	return;
			replace_by_iframe(container, iframe_url, iframe_w, iframe_h);
		});
	}
	var identica_process_profile	= function(){
				var imageEl	= $("div.author img.photo.avatar");
		var username	= imageEl.attr('alt');
		var container	= imageEl.parents('dd');
		return identica_replace_username(container, imageEl, username);
	}
	var identica_process	= function(){
		var pathname	= location.pathname;

		var tmp		= pathname.split('/');
		if( tmp.length == 2 && tmp[0] == "" && tmp[1] != "" )
			return identica_process_profile();
	}

	/********************************************************************************/
	/*		Handle urfastr.net						*/	
	/********************************************************************************/
	var urfastr_process	= function(){
				// just to notify urfastr_livatar userscript presence to the webpage
		if( window.urfastr_livatar_userscript_listener )
			window.urfastr_livatar_userscript_listener();
	}


	/********************************************************************************/
	/*		Handle facebook							*/	
	/********************************************************************************/
	var facebook_replace_uid	= function(container, imageEl, uid)
	{
		// get iframe_w/iframe_h
		var iframe_w	= $(imageEl).attr('width');
		var iframe_h	= $(imageEl).attr('height');

		// build livaterAPI call
		var query_str	= "facebook/uid/"+uid;
		// queue this query
		query_queue_add(query_str, function(iframe_url){
						if( !iframe_url )	return;
			replace_by_iframe(container, iframe_url, iframe_w, iframe_h);
		});
	}
	var facebook_process_profile	= function(){
				// http://www.facebook.com/home.php#/profile.php?id=1382401184&ref=name
		var imageEl	= $("img#profile_pic");
		container	= imageEl.parents('a');
		// get facebook uid
		var matches	= $(container).attr('href').match(/id=([\d+]+)/);
		var uid		= matches[1];
		// replace the profile picture
		facebook_replace_uid(container, imageEl, uid);
	}
	var facebook_process_home	= function(){
				// grab all the uid of the page
		var uids	= {};
		$('div.UIStream a.UIIntentionalStory_Pic img.UIRoundedImage_Image').each(function(){
			var element	= this;
			var matches	= $(element).attr('src').match(/\q([\w]+)_/);
			var uid		= matches[1];
			
			// if uid already is in uids, return now
			if( uids[uid] )	return;
			// add this element in usernames
			uids[uid]	= element;
		});

		// log to debug
		
		
		// got thru each uid
		for(uid in uids){
			var element	= uids[uid];
			var container	= $(element).parents("span.UIRoundedImage");
			var imageEl	= $(element);
			
			facebook_replace_uid(container, imageEl, uid);
		}
	}

	var facebook_process	= function(){

// TODO: change to adapt to their new url scheme
		// post 2009/06/13 a new url scheme is adopted to allow username
		

		var pathname_str	= location.pathname;
		var search_str		= location.search;
		// convert the location.hash into pathname (used by facebook for ajax+bookmark trick)
		if( location.hash.substr(0, 2) == '#/' ){
			pathname	= location.hash.substr(1);
			qmark_indexof	= location.hash.indexOf('?');
			if( qmark_indexof != -1 ){
				pathname_str	= location.hash.substr(1, qmark_indexof-1);
				search_str	= location.hash.substr(qmark_indexof);
			}else{
				pathname_str	= location.hash;
				search_str	= '';				
			}
		}

		// detect profile - post-username url
		if( /ref=name/.test(search_str) )	return facebook_process_profile();
		// detect the profile page - pre-username url
		if( pathname_str == '/profile.php' )	return facebook_process_profile();

		// detect profile - post-username url
		if( /ref=home/.test(search_str) )	return facebook_process_home();
		// detect the profile page - pre-username url
		if( pathname_str == '/home.php' )	return facebook_process_home();
	}

	/********************************************************************************/
	/*		Main code							*/	
	/********************************************************************************/
	// do the processing according to location.host
	if( location.host == "twitter.com" )		twitter_process();	
	else if( location.host == "identi.ca" )		identica_process();
	else if( location.host == "urfastr.net" )	urfastr_process();
	else if( location.host == "www.facebook.com" )	facebook_process();
	// process the just-built query_queue
	query_queue_process();
}

(function(){
	// if jquery is already loaded, run directly post jquery
	if(typeof jQuery != "undefined"){
		livatar_post_jquery(jQuery);
		return;
	}
	
	// get jquery from google
	// - see http://code.google.com/apis/ajaxlibs/
	// - use directly the url as twitter does
	var element = document.createElement("script");
	element.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
	window.document.body.appendChild(element);
	
	// build the js_str to run once it is loaded
	var js_str	= 'jQuery.noConflict();'
	js_str		+= 'livatar_post_jquery(jQuery);';
	
	// append another <script> containing js_str 
	var textEl	= document.createTextNode(js_str);
	var element	= document.createElement("script");
	element.appendChild(textEl);
	window.document.body.appendChild(element);
})();

