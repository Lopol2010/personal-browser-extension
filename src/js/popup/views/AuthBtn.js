import m from 'mithril'
import {StartAuthFlow, IsAuthorized} from '../../models/OAuth'

var Auth = {
	oninit: (vnode) => {
		IsAuthorized(status => { 
			vnode.state.authorized = status
			m.redraw() 
		})
	},
	view: function (vnode) { 
		return !vnode.state.authorized ? m('button.button[type=button]', { onclick: () => { BeginAuth(vnode) } }, 'Sign in') : null
	}
}
async function BeginAuth(vnode) {
	var token = await StartAuthFlow()
	vnode.state.authorized = token === undefined
	m.redraw()
}

export default Auth
