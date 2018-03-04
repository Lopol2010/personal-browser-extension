
if(window.location.href.includes('openload.')){
	
	
	chrome.storage.sync.get({convert: true}, items => {
		if(items.convert) ConvertFrameToVideo()
	})

}else {

	VideoPlayerStyles()

}


function VideoPlayerStyles() {
	var vid = $$('video')

	if( vid == null) return
	
	chrome.storage.sync.get(['poster', 'autoplay'], value => {

		if(!value.autoplay) vid.removeAttribute('autoplay')
		else vid.setAttribute('autoplay')

		if(value.poster) vid.setAttribute('poster', value.poster)
		
	})

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

	SavePoster()
	
	window.location = finalurl
}

//e.g. video preview image
function SavePoster () {
	var vid = $$('video[poster]')
	if(vid == null) return

	var posterURL = vid.getAttribute('poster')
	chrome.storage.sync.set({poster: posterURL})
}
