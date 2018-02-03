const Mailgun = require('mailgun-js')
var mailgun = new Mailgun({apiKey: process.env.MAIL_KEY, domain: process.env.MAIL_DOMAIN});
module.exports = function (recipient, subject, body, plainText, cb){
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
            console.log("got an error: ", err);
        }
        else {
          if (typeof cb === 'function') cb(null);
          console.log(body);
        }
    });

}