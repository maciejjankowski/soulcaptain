var SMSAPI = require('smsapi'),
    smsapi = new SMSAPI();

smsapi.authentication
    .loginHashed(process.env.SMS_USER, process.env.SMS_PASS)
   

function sendMessage(from, to, text, displayResult, displayError){
   // implement queueing / state saving
  
    return smsapi.message
        .sms()
        .from(from)
        .to(to)
        .message(text)
        .execute()
        .then(displayResult)
        .catch(displayError);
  // return Promise
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}
module.exports = sendMessage;
