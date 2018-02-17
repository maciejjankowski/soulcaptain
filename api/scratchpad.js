app.get('/sms',(req, res) => {
	// sms("Eco", "777666888", "cześć soulcaptain", ()=>console.log('poszło'), ()=>console.log('nie poszło'));
	// schedule failure retry to background processsing
	res.send('ok')
});

app.get('/testx',(req, res) => {
	let data = {
		testField : "testValue"
	}
	res.send('OK');
	res.render("password", data, function(err, body){
		if (err) return console.error(err);
		mail('', 'subject', body, 'this is just a text');
	});
});
