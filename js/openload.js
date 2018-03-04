
if(window.location.href.includes('openload.')){
	
	ConvertFrameToVideo()

}else {

	VideoPlayerStyles()

}




function VideoPlayerStyles() {
	var vid = $$('video')

	if( vid == null) return

	vid.style.height = '100%'
	vid.style.width = '100%'

	vid.volume = 0.2
	vid.addEventListener('mousewheel', function(e) {

		e.preventDefault()

		if(e.originalEvent.wheelDelta > 0)
			vid.currentTime += 1
		else
			vid.currentTime -= 1
	})
}

function ConvertFrameToVideo() {

	var streamurl = $$('span[id=streamurj]')

	//getting direct video without ad's (work with iframes and openload pages)
	if (streamurl === null || streamurl === undefined)
		return console.error('STREAM URL NOT FOUND: ' + document.location.href)

	var stream = streamurl.textContent

	var finalurl = `/stream/${stream}?mime=true`

	
	window.location = finalurl
}

