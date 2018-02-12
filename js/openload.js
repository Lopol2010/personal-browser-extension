(function() {
	if(window.location.href.includes('openload.')){
		
		ConvertFrameToVideo()

	}else {

		VideoSetup()

	}

	


	function VideoSetup() {
		var vid = $('video')

		if( vid.length < 0 ) return

		console.log(vid)

		vid.css('height', '100%')
		vid.css('width', '100%')

		vid[0].volume = 0.2
		vid.on('mousewheel', function(e) {

			e.preventDefault()

			if(e.originalEvent.wheelDelta > 0)
				vid[0].currentTime += 1
			else
				vid[0].currentTime -= 1
		})
	}

	function ConvertFrameToVideo() {

		var $streamurl = $('span[id=streamurj]')

		//getting direct video without ad's (work with iframes and openload pages)
		if ($streamurl === null || $streamurl === undefined || $streamurl.length <= 0)
			return console.error('STREAM URL NOT FOUND')

		var stream = $streamurl.text()

		var finalurl = `/stream/${stream}?mime=true`

		
		window.location = finalurl
	}
})()
