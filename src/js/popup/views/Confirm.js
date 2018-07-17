var m = require('mithril')

var visible = false
var title = ''
var Confirm = {
    oninit: (vn)=> {
        title = vn.attrs.title || ''
    },
    show: () => visible = true ,
    hide: () => visible = false ,
    view: function (vn) {
        return visible ? m('.block.block-expand', [
                            m('.block-title', title),
                            m('button.button', {onclick: () => { handleOk(vn) } }, 'OK'),
                            m('button.button', {onclick: () => { handleCancel(vn) } }, 'Cancel')
                        ]) : null
    }
}

function handleOk (vn) {
    if(vn.attrs.ok)
        vn.attrs.ok() 
    vn.state.hide()
}
function handleCancel (vn) {
    if(vn.attrs.cancel)
        vn.attrs.cancel()
    vn.state.hide()
}

module.exports = Confirm