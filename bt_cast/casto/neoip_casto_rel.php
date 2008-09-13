<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>UrFastR.tv player (beta)</title>
	<meta name="description" content="UrFastR video player for live and prerecorded video">
	<meta name="keywords" content="video, web2.0, p2p, stream, live, player">

<script src="../../jspackmin/data/neoip_jsplayer_packmin.js"></script>
<style type="text/css">	
	/* body style for the video fullpage mode - hardcoded for now */
	body {	height	: 100%;
		width	: 100%;
		margin	: 0px;
		overflow: hidden;
		background-color: #000000;
	}
</style>
</head>

<body>
<div id="neoip_player_container_id">Place to put player container</div>

<script>
	var 	cast_name	= "<?php echo $_GET['cast_name']; ?>";
	var 	cast_privhash	= "<?php echo $_GET['cast_privhash']; ?>";

	// build the neoip.ezplayer_t
	var ezplayer	= new neoip.ezplayer_t();
	ezplayer.play_post_playlist(true);
	ezplayer.fullpage_state("maximized");

	// set the server_date in ezplayer
	// - use php to get the server date now
	<?php	// version using microtime to be precise to the millisecond
		list($usec, $sec) = explode(' ', microtime());
		$usec_str	= substr( $usec, 1 );
		echo "var server_date=".$sec.$usec_str.";";			?>
	ezplayer.set_server_date( server_date*1000 );
	
	// if the uri contains a cast_name and cast_privhash variable, use it to load this playlist
	// - additionnaly dont put a playlist_arr, so impossible to change channel
	if( cast_name != "" && cast_privhash != "" ){
		// set the playlist_url in the ezplayer_t
		var playlist_url	= "../../cgi-bin/cast_get_playlist.fcgi?basename="+ cast_name +"_"+cast_privhash+".playlist_jspf";
		ezplayer.change_playlist(playlist_url);
	}else{
		ezplayer.load_plistarr("../mdata_echo_server/data/ezplayer_playlist_arr.json");
	}
	
	// start the ezplayer_t
	ezplayer.start();
</script>

<!-- BEGIN google analytic script -->
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
	var pageTracker = _gat._getTracker("UA-4037844-6");
	pageTracker._initData();
	pageTracker._trackPageview();

	// jme- Set a user-defined value as a segmentation to collect data on the widget_src
	// - if no variable 'neoip_widget_src' is found in the URI, assume "direct_access" else copy the value.
	// - currently "mozilla_prism" and "igoogle_gadget" are defined
	var widget_src	= "<?php echo $_GET['neoip_widget_src'] ? $_GET['neoip_widget_src'] : "direct_access" ?>";
	pageTracker._setVar(widget_src);
</script>
<!-- END   google analytic script -->

</body>
</html>
