import {GetAccessToken, IsAuthorized} from '../models/OAuth'
import {GetLastSavedSession, AppendCell} from '../models/Sheet'

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
		return true
	}
	if(req.event === "SaveTabs"){
		chrome.tabs.query({windowType: 'normal'}, (tabsArray, err) => {
			var tabs = tabsArray.map(cur => { return cur.url })
			tabs.reverse()
			var tabsToSave = JSON.stringify({'tabs': tabs})
			AppendCell(tabsToSave).then((res)=> {
				callback(res)
			})
		})
	}
	if(req.event === "LoadLastSavedTabs"){

		GetLastSavedSession().then(data => {
			console.log(data)
			var data = JSON.parse(data).tabs
			data.forEach(url=>{
				chrome.tabs.query({windowType: 'normal'}, (tabsArr)=>{
					chrome.tabs.create({index: tabsArr.length, url: url})
				})
			})
			
		})

	}
})

