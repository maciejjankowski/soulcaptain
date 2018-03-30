// TODO @maciej: zrobić zagnieżdżenie dla source
// out={
// 	"soulCardSoulencje": document.getElementsById("deckId").value,
// 	"source": {
// 		"author": document.getElementsById("author"),
// 	}
// }// uzyc funkcji replace

$('#buttong').on('click', function () {
	var out = {}


	$('[type=text]').each(function (index, element) {
		out[$(element).attr('name')] = $(element).val()
	})

	$('#soulOutput').html(JSON.stringify(out, null, 2))

})