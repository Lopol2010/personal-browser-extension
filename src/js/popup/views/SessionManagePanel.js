import m from 'mithril'
import {GetAccessToken, IsAuthorized} from '../../models/OAuth'
import Confirm from './Confirm'
import {SheetID} from '../../models/Sheet'
import Session from '../../models/Session'

var SessionManager = {
	oninit: (vnode) => {
		IsAuthorized(status => { 
			vnode.state.authorized = status
			m.redraw() 
		})
	},
	onupdate: (vnode) => { IsAuthorized( status => vnode.state.authorized = status ) },
	view: (vnode) => { //
		var sheetHref = 'https://docs.google.com/spreadsheets/d/' + SheetID
		
		return [m('.block', 
                    [m('.block-title', 
                        m('a#sheet-link', {href: sheetHref, onclick: Session.openSheetPage}, 'Session Manager')),
                    vnode.state.authorized ? [ m('button.button', {class: 'tabs-save', onclick: Session.save}, 'Save'),
												m('button.button', {class: 'tabs-load-last', onclick: Session.loadLast}, 'Open'),
												m('button.button', {class: 'tabs-delete-last', onclick: Confirm.show }, 'Delete')]
											: m('.tabs-auth-note', 'Auth is required!')]),
				m(Confirm, {ok: Session.deleteLast, title: 'Are you sure want to delete?' })]
	}
}

export default SessionManager
