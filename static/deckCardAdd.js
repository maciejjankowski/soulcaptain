$('#buttong').on('click', function () {
	var out = {}

	$('[type=text]').each(function (index, element) {
		out[$(element).attr('name')] = $(element).val()
	})

	$('#soulOutput').html(JSON.stringify(out, null, 2))

})

$('#buttong').on('click', function () {
	var out2 = {
		"soulCardSoulencje": document.getElementById("deckId").value,
		"source": {
			"author": document.getElementById("author"),
		}
	};

	$('#soulOutput2').html(JSON.stringify(out2, null, 2))

})

// TODO @maciej: zrobić zagnieżdżenie dla source

//  uzyc funkcji replace

