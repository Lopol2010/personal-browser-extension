import m from 'mithril'
import {GetLastSavedSession, AppendCell, GetRowsCount, DeleteRows, SheetID} from './Sheet'

export default { 
    deleteLast: function (e) {
        GetRowsCount().then(count => DeleteRows(count-1) )
    }, 
    loadLast: function (e) {
        GetLastSavedSession().then(data => {
			var data = JSON.parse(data)
			data.forEach(url=>{
				chrome.tabs.query({windowType: 'normal'}, (tabsArr)=>{
					chrome.tabs.create({index: tabsArr.length, url: url})
				})
			})
			
		})
    },
    save: function (e) {
        chrome.tabs.query({windowType: 'normal'}, (tabsArray, err) => {
            var tabs = tabsArray.map(cur => { return cur.url })
            tabs.reverse()
            var tabsToSave = JSON.stringify(tabs)
            AppendCell(tabsToSave)
        })
    },
    openSheetPage: function (e) {
        chrome.tabs.create({url: e.target.href})
    }
}