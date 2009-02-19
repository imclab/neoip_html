/**
 * Try to guess the operating system on which the application is running
 * - this is rather kludgy. guessing based on support features
 * - this is not reliable over time. but may be used as workaround
 * @returns {string} macos|win32|linux
*/
var guessOS	= function(){
	if(air.NativeApplication.supportsDockIcon)	return "macos";
	if(air.NativeWindow.supportsTransparency)	return "win32";
	return "linux";
}

/**
 * Determine the screen capabilities
 * - this function is mainly due to an issue on macos/win32 with the
 *   nochrome window going over the task bar
 * - workaround: hardcoding the taskbar position and size
 *   - issue: if the position/size is not the one assumed, it become ugly
 *   - example: on win32, setup firefox in fullscreen, and the nochromewin
 *     is still in the air for no reason.
 * - possible solutions: TODO
 *   - to do a maximised window and look at its position/size
 *   - to investigate
 * @returns {object} properties max_x/max_y/min_x/min_y/w/h
*/
var getScreenCap	= function()
{
	// determine the default margins
	var screenMargin	= {
		n:	0,
		e:	0,
		s:	0,
		w:	0
	};
	// KLUDGE: use hardcoded margin depending on plateform not to be on top on taskbar
	var curOS	= guessOS();
	if( curOS == "win32" ){
		screenMargin.s	= 30;
	}else if( curOS == "macos" ){
		screenMargin.n	= 22;
	}
	// compute the screenCap depending screenResolution and screenMargin
	var screenCap	= {
		min_x:	screenMargin.w,
		max_x:	air.Capabilities.screenResolutionX - screenMargin.e,
		min_y:	screenMargin.n,
		max_y:	air.Capabilities.screenResolutionY - screenMargin.s
	};
	// compute the width/height depending on max/min values
	screenCap.w	= screenCap.max_x - screenCap.min_x;
	screenCap.h	= screenCap.max_y - screenCap.min_y;
	// return the just-built result
	return screenCap;
}