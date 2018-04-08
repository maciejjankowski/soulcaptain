$('#buttong').on('click', function () {
	var out = {}

	$('[type=text]').each(function (index, element) {
		out[$(element).attr('name')] = $(element).val()
	})

	$('#soulOutput').html(JSON.stringify(out, null, 2))

})

$('#buttong').on('click', function () {
	var out2 = {
		"soulCardId": "",
		"soulCardTitle": "Litany against fear",
		"soulCardSoulencje": [{
			"source": {
				"author": document.getElementById("author").value,
				"created": "",
				"source": "",
				"sourceLink": ""
			},
			"_id": "",
			"soulIdParent": "",
			"soulType": "",
			"language": "",
			"text": "I must not fear. Fear is the mind-killer."
		}],
		"__v": 0
	};


	$('#soulOutput2').html(JSON.stringify(out2, null, 2))

})



//  uzyc funkcji replace