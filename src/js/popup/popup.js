import m from 'mithril'

import AuthBtn from './views/AuthBtn'
import SessionManagePanel from './views/SessionManagePanel'
import UserSettings from './views/UserSettings'
import RandBookmark from './views/RandomBookmark';

m.mount(document.body, {view: () => { return [m(UserSettings), m(SessionManagePanel), m(RandBookmark), m(AuthBtn)] }})
