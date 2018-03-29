// TODO @maciej: zrobić zagnieżdżenie dla source
$('#button').on('click', function () {
	var out = {};
	$('[type=text]').each(function (index, element) {
		out[$(element).attr('name')] = $(element).val();
	});
	$('.form-control').html(JSON.stringify(out, null, 2));
});
