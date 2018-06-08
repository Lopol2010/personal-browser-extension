import m from 'mithril'

var Auth = {
	oninit: (vnode) => {
		chrome.runtime.sendMessage({event: "AuthStatus"}, (status) => { 
			vnode.state.authorized = status
		})
	},
	view: (vnode) => { //
		return !vnode.state.authorized ? m('.block .block-btn .block-auth', m('.auth', {onclick: BeginAuth},'Authorization')) : null
	}
}
function BeginAuth() {
	chrome.runtime.sendMessage({event: "Auth"}, (status) => { 
		console.log(status)
	})
}

export default Auth
