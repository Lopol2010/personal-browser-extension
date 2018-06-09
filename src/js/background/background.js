import {GetAccessToken, IsAuthorized} from '../models/OAuth'
import {GetLastSavedSession, AppendCell} from '../models/Sheet'

chrome.storage.onChanged.addListener((changes, area)=>{
	// if(changes.convert){
	// 	chrome.tabs.reload()
	// }

})


chrome.runtime.onMessage.addListener((req, sender, callback) => {


})

