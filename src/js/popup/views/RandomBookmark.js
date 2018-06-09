import m from 'mithril'

var RandBookmark = {
	oninit: (vnode) => {

	},
	view: (vnode) => { 
		return m('.block .block-btn .block-randbookmark', m('.randbookmark', {onclick: openRandBookmak},'Random Bookmark'))
	}
}
function openRandBookmak() {
    chrome.bookmarks.getTree(arr => {

        var baseNode = arr[0].children
        var rndBookmark = getRandomBookmark(baseNode)
        chrome.tabs.query({windowType: 'normal'}, tabs => { 
            chrome.tabs.create({index: tabs.length, url: rndBookmark.url}) 
        })
        
        function getRandomBookmark (array) {
            var randNode = array[random(0, array.length-1)]
            if (randNode['url'] === undefined) {
                randNode = getRandomBookmark(randNode.children)
            }
            return randNode
        }

        function random (min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }
    })
}

export default RandBookmark