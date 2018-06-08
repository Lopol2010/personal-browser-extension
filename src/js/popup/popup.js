import {querySelectorAll, querySelector} from '../utils'
import m from 'mithril'

import Auth from './views/Auth'
import SessionManager from './views/SessionManager'
import Settings from './views/Settings'
import RandBookmark from './views/RandomBookmark';


var checkboxes = querySelectorAll('input[type=checkbox]')
var rndBookmarkBtn = querySelector('.bookmark')



m.mount(document.body, {view: () => { return [m(Settings), m(SessionManager), m(RandBookmark), m(Auth)] }})
