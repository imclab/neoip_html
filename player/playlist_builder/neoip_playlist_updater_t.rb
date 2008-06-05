#!/usr/bin/ruby
#
# \par Brief Description
# to update playlist_jspf
# - TODO if the plistgen_info file date is > to the playlist.jspf. the playlist.jspf
#   file should be regenerated from scratch

require 'neoip_playlist_t'
require 'neoip_trackgen_t'

module Neoip
class Playlist_updater_t

################################################################################
################################################################################
#			constructor
################################################################################
################################################################################
def initialize(plistgen_info, filename)

	# copy the parameter
	@plistgen_info	= plistgen_info;
	@filename	= filename;
end

################################################################################
################################################################################
#			query function
################################################################################
################################################################################

# return the playlist_id from plistgen_info
def playlist_id;	return @plistgen_info.playlist_id();	end
# return the playlist_title from plistgen_info
def playlist_title;	return @plistgen_info.playlist_title();	end
# return the trackgen_info from plistgen_info
def trackgen_info;	return @plistgen_info.trackgen_info();	end
# return the external_dep from plistgen_info
def external_dep;	return @plistgen_info.external_dep();	end

################################################################################
################################################################################
#
################################################################################
################################################################################

# return a initial_playlist
# - a very basic one with no tracks in it
def create_initial_playlist
	# build the initial playlist
	playlist	= Neoip::Playlist_t.new(playlist_id(), playlist_title())

	# add the 'external_dep' playlist extension IIF it exist in plistgen_info
	if external_dep()
		puts "add external deps #{external_dep.pretty_inspect}"
		playlist.jspf['extension']['external_dep']	= external_dep();
	end
	
	# return the just-built initial playlist
	return playlist
end

################################################################################
################################################################################
#
################################################################################
################################################################################

# process unread playlist
# - experimentation to avoid adding tracks to playlist when nobody is playing them
# - return true if the playlist needs to be further updated, false otherwise
def process_unread_playlist(playlist)
	# determine the date of the lastread
	# - done by a context file updated in /tmp by get_playlist.fcgi CGI
	readctx_fname	= "/tmp/.neoip_jsplayer_playlist.#{playlist_id()}.lastread"
	if File.exist?(readctx_fname)
		lastread_date	= File.mtime(readctx_fname);
	else
		lastread_date	= Time.parse("01/01/1970 00:00:00")
	end
	
	# determine the maximum delay between 2 read of playlist
	# - currently twice the playlist.jspf['meta']['reload_delay']
	interread_maxdelay	= playlist.jspf['meta']['reload_delay']/1000 * 2;

	# determine the begining date of the playlist
	playlist_begdate	= Time.parse(playlist.jspf['date']);

	# display to debug
	#puts "readctx_fname=#{readctx_fname}"
	#puts "lastread_date=#{lastread_date} playlist_noread_thres=#{lastread_date + interread_maxdelay}"
	#puts "interread_maxdelay=#{interread_maxdelay}"
	#puts "playlist_begdate=#{playlist_begdate}"

	# if the total_duration is less than 300, this playlist should be updated further
	if( playlist.total_duration() < 5*60*1000 )
		return true
	end

	# if begining date is < the last possible read, this playlist should be updated further
	if( playlist_begdate < lastread_date + interread_maxdelay )
		return true;
	end

	# log to debug
	puts "+++++++++++++++ no read for #{playlist_id()}. just updating playlist date"
		
	# so simply update the playlist.jspf['date'] to present time
	playlist.jspf['date']	= Time.now.gmtime.to_s;

	# write the playlist in the file
	begin
		playlist.to_file(@filename);
	rescue => e
		# log the event
		$stderr.puts "unable to write playlist file due to #{e} with a backtrace #{e.backtrace}";
		# TODO throw an exception
	end
		
	# return false to notify there is no need to add more track to this playlist
	return false;
end

################################################################################
################################################################################
#
################################################################################
################################################################################

def update()
	playlist	= nil;
	# read the data in the file
	begin
		playlist	= Neoip::Playlist_t.from_file(@filename);
	rescue => e
		# log the event
		$stderr.puts "unable to read playlist due to #{e}";
		# create initial playlist
		playlist	= create_initial_playlist()
	end

	# if nobody read this playlist, no need to update it.
	need_further_upate	= process_unread_playlist(playlist)
	return if not need_further_upate;

	# remove obsolete track
	playlist.remove_track_before(Time.now.gmtime);
	
	# if there are no more track at this point, act as if no file were found
	if( playlist.jspf['track'].empty? )
		playlist	= create_initial_playlist()
	end
	
	# loop and adds track from the pool
	while true
		# if the playlist end in more than 300-sec, stop looping
		# - TODO make this delay tunable
		date_end = Time.parse(playlist.jspf['date']) + playlist.total_duration()/1000;
		if( date_end >= Time.now + 300 )
			break;
		end

		# get some track from the Trackgen_t
		track_gen	= Neoip::Trackgen_t.new( trackgen_info() )
		track_arr_jspf	= track_gen.to_jspf_arr();
	
		# log to debug
		track_arr_jspf.each { |track_jspf| $stderr.puts "Adding #{track_jspf['title']}"	}
	
		# put those tracks into the playlist_jspf
		playlist.jspf['track'].concat(track_arr_jspf);
	end

	puts "total_duration=" + playlist.total_duration.to_s
	#$stderr.puts JSON.pretty_generate(playlist.jspf);
	
	# write the data in the file
	begin
		playlist.to_file(@filename);
	rescue => e
		# log the event
		$stderr.puts "unable to write playlist file due to #{e}";
		# TODO throw an exception
	end
end

end	# end of class	Playlist_updater_t
end	# end of module	Neoip

