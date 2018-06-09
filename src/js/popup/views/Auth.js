import m from 'mithril'
import {GetAccessToken, IsAuthorized} from '../../models/OAuth'

var Auth = {
	oninit: (vnode) => {
		IsAuthorized(status => { 
			vnode.state.authorized = status
			m.redraw() 
		})
	},
	view: (vnode) => { //
		return !vnode.state.authorized ? m('.block .block-btn .block-auth', m('.auth', {onclick: BeginAuth},'Authorization')) : null
	}
}
function BeginAuth() {
	GetAccessToken().then(token =>{ 
		console.log(token)
	})
}

export default Auth
