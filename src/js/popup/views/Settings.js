import m from 'mithril'

var Checkboxes = {
    convert: {
            title: 'Extraxt Openload Video',
            id: 'convert',
            checked: false
    },
    autoplay: {
            title: 'Autoplay',
            id: 'autoplay',
            checked: false
    },

}

function name(vnode) {

}

var Settings = {
	oninit: (vnode) => {
        chrome.storage.local.get(Object.keys(Checkboxes), (data)=>{
            Object.keys(data).forEach(elem => {
                Checkboxes[elem].checked  = data[elem]
            })
            console.log(data)
            m.redraw()
        })
	},
    view: (vnode) => { //
        
        return m('.block', [
                    m('.block-title', 'Options'),
                    ...Object.keys(Checkboxes).map(chbName => m(CheckboxLayout, Checkboxes[chbName] ))
            ])
	}
}

var CheckboxLayout = {
    view: (vn) => {
        return m('.option', [
                    m('.checkbox-title', vn.attrs.title),
                    m('input[type=checkbox]', {onclick: clickHandle, id: vn.attrs.id, checked: vn.attrs.checked})
        ])
    }
}


function clickHandle(e) {
    var options = {}
    options[e.target.id] = e.target.checked
    chrome.storage.local.set(options, ()=>{
        console.log('Checkbox saved: ' + e.target.name + ' ' + e.target.checked)
        Checkboxes[e.target.id].checked = e.target.checked //change view state
    })

}

export default Settings