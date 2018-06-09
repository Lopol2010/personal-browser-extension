import {querySelectorAll, querySelector} from '../utils'
import m from 'mithril'

import Auth from './views/Auth'
import SessionManagePanel from './views/SessionManagePanel'
import Settings from './views/Settings'
import RandBookmark from './views/RandomBookmark';


var checkboxes = querySelectorAll('input[type=checkbox]')
var rndBookmarkBtn = querySelector('.bookmark')



m.mount(document.body, {view: () => { return [m(Settings), m(SessionManagePanel), m(RandBookmark), m(Auth)] }})
