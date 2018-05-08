app.get('/sms', (req, res) => {
	// sms("Eco", "777666888", "cześć soulcaptain", ()=>console.log('poszło'), ()=>console.log('nie poszło'));
	// schedule failure retry to background processsing
	res.send('ok');
});

app.get('/testx', (req, res) => {
	let data = {
		testField: 'testValue'
	};
	res.send('OK');
	res.render('/emails/password', data, function (err, body) {
		if (err) return console.error(err);
		mail('', 'subject', body, 'this email is in HTML, sorry!');
	});
	res.render('/emails/welcome', data, function (err, body) {
		if (err) return console.error(err);
		mail('', 'Welcome to SoulCaptain', body, 'this email is in HTML, sorry!');
	});
});



// this is from email.js
// module.exports = function (recipient, subject, body, plainText, cb) 
