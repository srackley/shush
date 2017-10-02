const twilio = require('twilio');


var accountSid = 'ACe616576b6430476257babf503fd8ff80'; // Your Account SID from www.twilio.com/console
var authToken = '9b9d74b0cebac75352a43e0c51a8f9f3';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+13237198259',  // Text this number
    from: '+15182786877' // From a valid Twilio number
}).then((message) => console.log(message.sid));

 module.exports = client; 