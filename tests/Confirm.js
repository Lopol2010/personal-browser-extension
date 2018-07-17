global.window = require('mithril/test-utils/browserMock.js')()
global.document = window.document
var m = require('mithril')
var o = require('mithril/ospec/ospec')

var Confirm = require('./../src/js/popup/views/Confirm')

o('Confirm box usage', function () {

    var Component = {
        view: function () {
            return m('div', [
                        m('button', {onclick: () => { Confirm.show() }}),
                        m(Confirm, {title: 'kissa'})
            ])
        }
    }
    

    m.mount(document.body, Component)

    console.log(Confirm.hidden)
    document.body.firstChild.firstChild.dispatchEvent({type: 'click'})
    console.log(Confirm.hidden)
})