import m from 'mithril'

var Checkbox = {
    //id - name of the user option and DOM id
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
    view: (vnode) => {
        
        return m('.block', [
                    m('.block-title', 'Options'),
                    Object.keys(Checkbox.list).map(chbName => m(CheckboxLayout, Checkbox.list[chbName] ))
            ])
	}
}

var CheckboxLayout = {
    view: (vn) => {
        return m('.checkbox', {onclick: () => { saveOption(vn) }, id: vn.attrs.id}, [
                    m('.checkbox-label', vn.attrs.title),
                    vn.attrs.checked ? m('.checkbox-checked') : m('.checkbox-unchecked')
        ])
    }
}

function saveOption(vn) {
    var options = {}
    var id = vn.attrs.id
    var newState = !Checkbox.list[id].checked 
    Checkbox.list[id].checked = newState
    options[id] = newState
    chrome.storage.local.set(options, ()=>{
        console.log('Option saved: ' + id + ' ' + newState)
    })
}

export default Settings