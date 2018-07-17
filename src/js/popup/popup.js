import m from 'mithril'

import AuthBtn from './views/AuthBtn'
import SessionManagePanel from './views/SessionManagePanel'
import UserSettings from './views/UserSettings'
import RandBookmark from './views/RandomBookmark'
import ResetBtn from './views/ResetBtn'
import Divider from './views/Divider'

require('../../style/popup.sass')

m.mount(document.body, {view: () => { return [m(UserSettings), m(SessionManagePanel), m('.block', [
    m('.block-title', 'Misc'),
    m(RandBookmark), m(AuthBtn), m(ResetBtn)
])] }})
