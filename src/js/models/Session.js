import m from 'mithril'
import {GetLastSavedSession, AppendCell, GetRowsCount, DeleteRows, SheetID} from './Sheet'

export default { 
    deleteLast: function (e) {
        GetRowsCount().then(count => {
            DeleteRows(count-1).then(res => {
                
            })
        })
    }, 
    loadLast: function (e) {
        // chrome.runtime.sendMessage({event: "LoadLastSavedTabs"}, isAuth => { })
        GetLastSavedSession().then(data => {
			console.log(data)
			var data = JSON.parse(data).tabs
			data.forEach(url=>{
				chrome.tabs.query({windowType: 'normal'}, (tabsArr)=>{
					chrome.tabs.create({index: tabsArr.length, url: url})
				})
			})
			
		})
    },
    save: function (e) {
        // chrome.runtime.sendMessage({event: "SaveTabs"}, res => { console.log('save tabs') })
        chrome.tabs.query({windowType: 'normal'}, (tabsArray, err) => {
            var tabs = tabsArray.map(cur => { return cur.url })
            tabs.reverse()
            var tabsToSave = JSON.stringify({'tabs': tabs})
            AppendCell(tabsToSave).then((res)=> {
                callback(res)
            })
        })
    },
    openSheetPage: function (e) {
        chrome.tabs.create({url: e.target.href})
    }
}