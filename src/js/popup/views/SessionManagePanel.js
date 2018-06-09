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
	view: (vnode) => { //
		var sheetHref = 'https://docs.google.com/spreadsheets/d/' + SheetID
		
		return [m('.block .tabs', 
                    [m('.block-title', 
                        m('a#sheet-link', {href: sheetHref, onclick: Session.openSheetPage}, 'Sessions Database')),
                    vnode.state.authorized ? [ m('button', {class: 'tabs-save', onclick: Session.save}, 'Save Tabs'),
												m('button', {class: 'tabs-load-last', onclick: Session.loadLast}, 'Load Last Session'),
												m('button', {class: 'tabs-delete-last', onclick: Confirm.show.deleteLast }, 'Delete Last')]
											: m('.tabs-auth-note', 'Auth is required!')]),
				m(Confirm, {ok: Session.deleteLast, titles: {deleteLast: 'Are you sure want to delete?'} })]
	}
}









export default SessionManager
