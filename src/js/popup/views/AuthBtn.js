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
		return !vnode.state.authorized ? m('.button-block', m('.auth', {onclick: BeginAuth},'Authorization')) : null
	}
}
function BeginAuth() {
	GetAccessToken()
}

export default Auth
