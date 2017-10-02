const app = require('express')();
const bodyParser= require('body-parser');

const twilio = require('twilio');
var accountSid = 'ACe616576b6430476257babf503fd8ff80'; // Your Account SID from www.twilio.com/console
var authToken = '9b9d74b0cebac75352a43e0c51a8f9f3';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Naked people on 3000');
});

app.get('/', function(req, res, next){
    client.messages.create({
           body: 'You\'re at a ' + req.body + ', and I need you at a 2',
           to: '+13237198259',  // Text this number
           from: '+15182786877', // From a valid Twilio number
           mediaUrl: 'https://media.giphy.com/media/3og0ILz1oLrgFRuzny/giphy.gif'
       }).then((message) => console.log(message.sid));    
   });

// app.post('/', function(req, res, next){
//  client.messages.create({
//         body: 'You\'re at a ' + req.body +', and I need you at a 2',
//         to: '+13237198259',  // Text this number
//         from: '+15182786877', // From a valid Twilio number
//         mediaUrl: 'https://media.giphy.com/media/3og0ILz1oLrgFRuzny/giphy.gif'
//     }).then((message) => console.log(message.sid));    
// });