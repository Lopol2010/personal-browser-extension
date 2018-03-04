chrome.storage.onChanged.addListener((changes, area)=>{
	if(changes.convert){
		chrome.tabs.reload()
	}
})