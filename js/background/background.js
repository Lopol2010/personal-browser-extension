chrome.storage.onChanged.addListener((changes, area)=>{
	if(changes.convert){
		chrome.tabs.reload()
	}

})

chrome.runtime.onMessage.addListener((req, sender, callback) => {

	if(req.event === "Auth"){
		GetAccessToken().then(token =>{ 
			callback(token !== undefined && token.length > 10)
		})
		return true
	}
	if(req.event === "AuthStatus"){
		IsAuthorized(status => { callback(status) })
	}
	if(req.event === "RandomBookmark"){
		chrome.bookmarks.getTree(arr => {

			baseNode = arr[0].children
			rndBookmark = getRandomBookmark(baseNode)
			chrome.tabs.query({windowType: 'normal'}, tabs => { 
				chrome.tabs.create({index: tabs.length, url: rndBookmark.url}) 
			})
			
			function getRandomBookmark (array) {
				var randNode = array[random(0, array.length-1)]
				if (randNode['url'] === undefined) {
					randNode = getRandomBookmark(randNode.children)
				}
				return randNode
			}

			function random (min, max) {
				return Math.round(Math.random() * (max - min) + min)
			}
		})
	}
	if(req.event === "SaveTabs"){
		chrome.tabs.query({windowType: 'normal'}, (tabsArray, err) => {
			tabs = tabsArray.map(cur => { return cur.url })
			tabs.reverse()
			var tabsToSave = JSON.stringify({'tabs': tabs})
			AppendCell(tabsToSave).then((res)=> {
				callback(res)
			})
		})
	}
	if(req.event === "LoadLastSavedTabs"){

		GetColumnData().then(allData => {
			allData = allData[allData.length-1]
			parsedArr = JSON.parse(allData).tabs
			parsedArr.forEach(url=>{
				chrome.tabs.query({windowType: 'normal'}, (tabsArr)=>{
					chrome.tabs.create({index: tabsArr.length, url: url})
				})
			})
			
		})

	}
})

