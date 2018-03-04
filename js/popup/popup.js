var checkboxes = $('.option input[type=checkbox]')

checkboxes.forEach(el => {

	//apply saved values
	chrome.storage.sync.get(el.id, (items)=>{
		el.checked = items[el.id]
	})
		
	el.addEventListener('click', event => {

		var obj = {}
		obj[el.id] = el.checked
		chrome.storage.sync.set(obj, ()=>{
			console.log('Checkbox saved: ' + el.name)
		})

	})

})