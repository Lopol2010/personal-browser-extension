var checkboxes = $('input[type=checkbox]')
var domains = $$('.domains')

var tabs = $$('.tabs')
var list = $$('.tabs .list textarea')
var exportBtn = $$('.tabs .export')
var importBtn = $$('.tabs .import')

var saveTabsBtn = $$('.tabs-save')
var loadLastTabsBtn = $$('.tabs-load-last')
var authNote = $$('.tabs-auth-note')

var rndBookmarkBtn = $$('.bookmark')
var authBtn = $$('.auth')


//region Initialization
chrome.runtime.sendMessage({event: "AuthStatus"}, (status) => { 
	UpdateUI(status)
})
//Check for being authenticated and show\hide corresponsive things 
checkboxes.forEach(el => {
	//apply saved values
	chrome.storage.sync.get(el.id, (items)=>{
		el.checked = items[el.id]
	})

	el.addEventListener('click', event => {
		
		var obj = {}
		obj[el.id] = el.checked
		chrome.storage.sync.set(obj, ()=>{
			console.log('Checkbox saved: ' + el.name)
		})
	})
})
//endregion Initialization

//Tabs Manager (new)
loadLastTabsBtn.onclick = function (e) {
	chrome.runtime.sendMessage({event: "LoadLastSavedTabs"}, isAuth => { })
}
saveTabsBtn.onclick = function (e) {
	chrome.runtime.sendMessage({event: "SaveTabs"}, res => { console.log('save tabs callback: ' + res) })
}

//region Authorization
authBtn.onclick = function (e) {
	chrome.runtime.sendMessage({event: "Auth"}, (status) => { 
		UpdateUI(status)
	})
}

//region Random Bookmark
rndBookmarkBtn.onclick = function (e) {
	chrome.runtime.sendMessage({event: "RandomBookmark"}, res => { })
}

function UpdateUI(authStatus) {
	saveTabsBtn.hidden = !authStatus
	loadLastTabsBtn.hidden = !authStatus
	authNote.hidden = authStatus
	$$('.block-auth').hidden = authStatus
}


//region Legacy Tab Manager
//Tabs Manager (legacy)
// exportBtn.onclick = function (e) {
// 	getAllTabs().then(tabsArray=>{
// 		tabsArray.forEach(tab => {
// 			list.append(tab.url + ( tab.index == tabsArray.length-1 ? '' : '|' ))
// 		})
// 	})
// }
// importBtn.onclick = function (e) {
// 	var links = list.value.split('|')
// 	getAllTabs().then(tabs=>{

// 		links.forEach(lnk=>{
// 			chrome.tabs.create({index: tabs.length, url: lnk})
// 		})

// 	})
// }
//endregion