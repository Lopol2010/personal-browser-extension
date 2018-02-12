(function() {

	if(window.location.href.includes('torjackan.') || window == window.top){
		ObserveAndRemoveAds(10)
	}

	function ObserveAndRemoveAds (timeout) {
		// выбираем целевой элемент
		var target = $('body')[0]

		// создаём экземпляр MutationObserver
		var observer = new MutationObserver(function(mutations) {

			mutations.forEach(function(mutation) {

				var $cur = $(mutation.addedNodes)
				var $cur2 = $(mutation.target)

				if($cur.css('z-index') > 0 || $cur.is('script, iframe, .padPreload')){

					console.log($cur)

					$cur.remove()
					$cur2.remove()
				}

			})
			// 
			$('script, iframe:not([src*="openload"]), .padPreload, div[style*="z-index"]').remove()

			//defuse all links
			$('a[href*="ouo"]').each(function() {
				this.href = decodeURIComponent(this.href.replace(/.*=/, ''))
			})

			//remove everything constains 'ad' in class name
			$('div[class*=ad], p[class*=ad]').remove()

		})

		var config = { attributes: true, childList: true, characterData: true }

		observer.observe(target, config)

		// setTimeout(function(){
		// 	observer.disconnect()
		// 	// alert(123)
		// }, timeout)
	}

})()
