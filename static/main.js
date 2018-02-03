var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    soulDeck : { // rozszerz sobie ten obiekt i zrób z niego widok
      "soulDeckId" : "201801191933450000000001",
      "soulDeckProperities" : {
              "soulDeckTitle" : "Wiktors' DECK",
              "soulDeckCreated" : "2018.01.01"
              }  
    },
    soulCard : {}, // chciałbym stworzyć element "soulDeckCards" i w niego wrzucić 'soulCard', 
    // MJ: a przypadkiem soulDeckCards nie powinno siedzieć w soulDecku powyżej? Napisałę Ci nawet komentarz : rozszerz sobie ten obiekt... 
    // MJ: czyli dodaj do niego właściwość
    admin : 0,
    loggedIn : 1,
    habits : []
  },
  
  
  methods : {
    saveUser: (e) => {
      e.preventDefault();
      if ($('userAddForm [name="password"]').val() !== $('userAddForm [name="repeatpassword"]').val()){
        return alert('hasła się nie zgadzają');
      }
      $.ajax({
        method:'POST', 
        url:'/user', 
        data : JSON.stringify({payload:$( "#userAddForm" ).serializeArray()}), 
        contentType: "application/json; charset=utf-8"
      })
      .then(()=>{
        $('#saveUserButton').removeAttr("disabled");
        alert('user created')
      });
      
      $('#saveUserButton').attr("disabled", true);
      
      return false;
    },
    login : login
  }
})

function login(e){
  e.preventDefault();
  $.ajax({
    method:'POST', 
    url:'/login', 
    data : $( "#loginForm" ).serializeArray(), 
  }).then(()=>{
    app.loggedIn = 1;
    console.log('logged in')
  })
}


$(()=>{
  $.get('/deck').then(function _handleResponse(response){
    app.deck = response
  });
}) // onload


var MockDeck = {  
   "soulDeckId":"201801191933450000000001",
   "soulDeckTitle":"Wiktors' DECK",
   "soulDeckCards":[  
      {  
         "soulCardId":"00001",
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
               "soulType":"prayer",
               "language":"ENG",
               "text":"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.",
               "source":{  
                  "author":"Święty Mateusz",
                  "created":"10",
                  "source":"Bibila",
                  "sourceLink":"https://pl.wikiquote.org/wiki/Ewangelia_Mateusza"
               }
            }
         ]
      },
      {  
         "soulCardId":"00002",
         "soulCardTitle":"litany against fear",
         "soulCardSoulencje":[  
            {  
               "soulId":"003",
               "soulIdPArent":"null",
               "soulType":"prayer",
               "language":"EN",
               "text":"I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
               "source":{  
                  "author":"Frank Herbert",
                  "created":"1965",
                  "source":"Dune",
                  "sourceLink":"https://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
               }
            },
            {  
               "soulId":"004",
               "soulIdPArent":"null",
               "soulType":"prayer",
               "language":"ENG",
               "text":"Nie wolno się bać. Strach zabija duszę.  Strach to mała śmierć, a wielkie unicestwienie.  Stawię mu czoło.  Niech przejdzie po mnie i przeze mnie.  A kiedy przejdzie, odwrócę oko swej jaźni na jego drogę.  Którędy przeszedł strach, tam nie ma nic. Jestem tylko ja.",
               "source":{  
                  "author":"Frank Herbert",
                  "created":"1965",
                  "source":"Dune",
                  "sourceLink":"hhttps://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
               }
            }
         ]
      }
   ]
}

app.soulDeck = MockDeck
