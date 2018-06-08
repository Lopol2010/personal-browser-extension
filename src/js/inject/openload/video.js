import {querySelectorAll, querySelector} from '../../utils'


var vid = querySelector('video')

//get poster and paste
chrome.storage.local.get({poster: '', autoplay: false}, value => {

	value.autoplay ? vid.setAttribute('autoplay') : vid.removeAttribute('autoplay')

	// vid.removeAttribute('controls')

	if(value.poster) vid.setAttribute('poster', value.poster)
	
})

vid.volume = 0.2
vid.addEventListener('mousewheel', function(e) {

	e.preventDefault()

	if(e.originalEvent.wheelDelta > 0)
		vid.currentTime += 1
	else
		vid.currentTime -= 1
})

vid.addEventListener('click', function(e) {
	(!this.paused && !this.ended && this.currentTime > 0) ? this.pause() : this.play()
})