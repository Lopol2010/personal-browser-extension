import m from 'mithril'

var ResetBtn = {
	oninit: (vnode) => {

	},
	view: (vnode) => { 
        return m('button.button', {onclick: () => { chrome.storage.local.clear() }},'Reset Extension State')
	}
}



export default ResetBtn