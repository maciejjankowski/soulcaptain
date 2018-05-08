const Mailgun = require('mailgun-js');
var mailgun = new Mailgun({
	apiKey: process.env.MAIL_KEY,
	domain: process.env.MAIL_DOMAIN
});

// to prawdopodsobnie będzie do usuniecia
function mail(recipient, subject, body, plainText, cb) {
	let message = {
		from: 'Soulcaptain <powiadomienia@mail.soulcaptain.org>',
		to: recipient,
		subject: subject,
		text: plainText || 'we only support html emails, sorry',
		html: body
	};
	mailgun.messages().send(message, function (err, body) {
		//If there is an error, render the error page
		if (err) {
			if (typeof cb === 'function') cb(err);
			console.log('got an error: ', err);
		} else {
			if (typeof cb === 'function') cb(null);
			console.log(body);
		}
	});

};

module.exports = {
	sendWelcome: function welcomeEmailContents(res, userEmailFoReal) {
		var data = {};
		res.render('/email/templates/welcome', data, function (err, body) {
			if (err) return console.error(err);
			mail(userEmailFoReal, 'Welcome to SoulCaptain', body, 'this email is in HTML, sorry!', function welcomeEmailSentYes(thisIsNotGood, thisIsGood) {
				console.log(thisIsNotGood, thisIsGood)
			});
		});
	},

	sendPasswordReminder: function sendPasswordReminderContents() {
		res.render('/email/templates/password', data, function (err, body) {
			if (err) return console.error(err);
			mail('', 'SoulCaptain pssword reminder', body, 'this email is in HTML, sorry!');
		});
	}

}