import m from 'mithril'


var Confirm = {
    title: '',
    titles: [],
    oninit: (vn)=> {
        vn.state.titles = vn.attrs.titles 
        Object.keys(vn.state.titles).forEach(keyName => {
            vn.state.show[keyName] = () => { vn.state.title = vn.state.titles[keyName] }
        })
    },
    show: { },
    hide: function () {
        this.title = ''
        // m.redraw()
    },
    view: function (vn) {
        
        return vn.state.title ? m('.block.block-expand', [
                            m('.block-title', vn.state.title),
                            m('button', {onclick: () => { onOk(vn) } }, 'OK'),
                            m('button', {onclick: ()=>{ onCancel(vn) } }, 'Cancel')
                        ]) : null
    }
}

function onOk (vn) {
    if(vn.attrs.hasOwnProperty('ok'))
        vn.attrs.ok() 
    vn.state.hide()
}
function onCancel (vn) {
    if(vn.attrs.hasOwnProperty('cancel'))
        vn.attrs.cancel()
    vn.state.hide()
}

export default Confirm