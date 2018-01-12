var express = require('express');
var app = express();

app.use(express.static('static'));
var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`, { useMongoClient: true });
mongoose.Promise = global.Promise;


var Card = mongoose.model('Card',
{  
   "coulCardId" : String,
   "soulCardTitle" : String,
   "soulCardSoulencje" : [  
      {  
         "soulIdParent" : String,
         "soulType" : String,
         "language" : String,
         "text" : String,
         "source":{  
            "author" : String,
            "created" : Date,
            "source" : String,
            "sourceLink" : String
         }
      }
  
   ]
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/-deck',(req, res)=>{
  res.sendFile(__dirname + '/scheme-soulcard.json');
});

app.get('/deck',(req, res) => {
  Card.findOne().then((cards) => {
    //if (err) return console.log(err);
    res.send(cards);
  });
});

app.get('/soulencja',(req, res) => {
  res.sendFile(__dirname + '/scheme-soulencja.json');
});

app.post('/deck', (req, res)=>{
  
});






app.post('/card2', (req, res) => {
  var card = new Card({  
   "coulCardId":"132123",
   "soulCardTitle":"Proście, Szukajcie, Pukajcie",
   "soulCardSoulencje":[  
      {  
         "soulId":"001",
         "soulIdPArent":"null",
         "soulType":"prayer",
         "language":"PL",
         "text":"Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam. Albowiem każdy, kto prosi, otrzymuje; kto szuka, znajduje; a kołaczącemu otworzą.",
         "source":{  
            "author":"Święty Mateusz",
            "created":"10",
            "source":"Bibila",
            "sourceLink":"https://pl.wikiquote.org/wiki/Ewangelia_Mateusza"
         }
      },
      {  
         "soulId":"002",
         "soulIdPArent":"null",
         "soulType":"afirmation",
         "language":"PL",
         "text":"Myślę więc jestem",
         "source":{  
            "author":"Kartezjusz",
            "created":"1637",
            "source":"Rozprawy o metodzie",
            "sourceLink":"https://pl.wikipedia.org/wiki/Cogito_ergo_sum"
         }
      }
   ]
})
  
card.save(function (err) {
  if (err) {
    console.log(err);
    res.send(400, {status:'error',error: 'problem saving', details : err})
  } else {

    res.send({status:'ok'});
  }
});
  
}) 

app.post('/deck/:id/soulencja', (req, res)=>{

})