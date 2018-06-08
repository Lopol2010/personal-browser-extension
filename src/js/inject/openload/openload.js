import {querySelectorAll, querySelector} from '../../utils'

chrome.storage.local.get({convert: true}, items => {
	if(items.convert) {
		SavePoster()
		ConvertFrameToVideo()
	}
})


function ConvertFrameToVideo() {
	var streamurl = querySelector('p[id][style][class]').innerText
	if (streamurl === null || streamurl === undefined)
		return console.error('STREAM URL NOT FOUND: ' + document.location.href)

	var finalurl = `/stream/${streamurl}?mime=true`
	window.location = finalurl
}

function SavePoster () {

	var vid = querySelector('video[poster]')
	if(vid == null) return

	var poster = vid.getAttribute('poster')
	chrome.storage.local.set({poster: poster})
}

