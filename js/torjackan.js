
if(window.location.href.includes('torjackan.') && window == window.top){

	ContinousExec(30, 10, function(){
		$('script, iframe:not([src*="openload"]), .padPreload, div[style*="z-index"]').forEach(el => {
			el.remove()
		})

		//defuse all links
		$('a[href*="ouo"]').forEach(function(el, i) {
			el.href = decodeURIComponent(el.href.replace(/.*=/, ''))
		})

	})
}

function ContinousExec (interval, count, f) {

	var handler = setInterval(()=>{
		f()
		if(--count <= 0)
			clearInterval(handler)
	}, interval)
}

