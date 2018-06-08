import m from 'mithril'
var SessionManager = {
	oninit: (vnode) => {
		chrome.runtime.sendMessage({event: "AuthStatus"}, (status) => { 
			vnode.state.authorized = status
			m.redraw()
		})
	},
	view: (vnode) => { //
		var sheetHref = 'https://docs.google.com/spreadsheets/d/1OS91bJCEYx_BbXJkStNF6uzpheJZC6rej-MqJdEYYyA' 
		
		return [m('.block .tabs', 
                    [m('.block-title', 
                        m('a#sheet-link', {href: sheetHref}, 'Saved Sessions')),
                    vnode.state.authorized ? [ m('button', {class: 'tabs-save', onclick: save}, 'Save Tabs'),
                                                m('button', {class: 'tabs-load-last', onclick: loadLast}, 'Load Last Session')] 
                                            : m('.tabs-auth-note', 'Auth is required!')])]
	}
}

function loadLast(e) {
	chrome.runtime.sendMessage({event: "LoadLastSavedTabs"}, isAuth => { })
}
function save(e) {
	chrome.runtime.sendMessage({event: "SaveTabs"}, res => { console.log('save tabs') })
}

export default SessionManager
