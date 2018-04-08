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
		"soulCardTitle": document.getElementById("soulCardTitle").value,
		"soulCardSoulencje": [{
			"source": {
				"author": document.getElementById("author").value,
				"created": document.getElementById("created").value,
				"source": document.getElementById("source").value,
				"sourceLink": document.getElementById("sourceLink").value
			},
			"_id": "",
			"soulIdParent": document.getElementById("soulIdParent").value,
			"soulType": document.getElementById("soulType").value,
			"language": document.getElementById("language").value,
			"text": document.getElementById("text").value
		}],
		"__v": 0
	};


	$('#soulOutput2').html(JSON.stringify(out2, null, 2))

})



//  uzyc funkcji replace