chrome.storage.sync.get({convert: true}, items => {
	if(items.convert) {
		// SavePoster()
		ConvertFrameToVideo()
		console.log('done')
	}
console.log($('p[id][style][class]').text())
	
})


function ConvertFrameToVideo() {

	var streamurl = $('p[id][style][class]').text()


	//getting direct video without ad's (work with iframes and openload pages)
	if (streamurl === null || streamurl === undefined)
		return console.error('STREAM URL NOT FOUND: ' + document.location.href)

	var finalurl = `/stream/${streamurl}?mime=true`
	console.log(finalurl)

	window.location = finalurl
}

//e.g. video preview image
function SavePoster () {
	var vid = $$('video[poster]')
	if(vid == null) return

	var posterURL = vid.getAttribute('poster')
	chrome.storage.sync.set({poster: posterURL})
}
