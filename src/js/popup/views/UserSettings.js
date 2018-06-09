import m from 'mithril'

var Checkbox = {
    ///id - name of the user option and DOM id
    create: function (title, id) {
        this.list[id] = {title: title, id: id, checked: false}
    },
    list: {}
}
Checkbox.create('Extraxt Openload Video', 'convert')
Checkbox.create('Autoplay Video', 'autoplay')



var Settings = {
	oninit: (vnode) => {
        chrome.storage.local.get(Object.keys(Checkbox.list), (data)=>{
            Object.keys(data).forEach(elem => {
                Checkbox.list[elem].checked  = data[elem]
            })
            m.redraw()
        })
	},
    view: (vnode) => { //
        
        return m('.block', [
                    m('.block-title', 'Options'),
                    Object.keys(Checkbox.list).map(chbName => m(CheckboxLayout, Checkbox.list[chbName] ))
            ])
	}
}

var CheckboxLayout = {
    view: (vn) => {
        return m('.option', [
                    m('.checkbox-title', vn.attrs.title),
                    m('input[type=checkbox]', {onclick: saveOption, id: vn.attrs.id, checked: vn.attrs.checked})
        ])
    }
}

function saveOption(e) {
    var options = {}
    options[e.target.id] = e.target.checked
    Checkbox.list[e.target.id].checked = e.target.checked //change view state
    chrome.storage.local.set(options, ()=>{
        console.log('Option saved: ' + e.target.name + ' ' + e.target.checked)
    })
}

export default Settings