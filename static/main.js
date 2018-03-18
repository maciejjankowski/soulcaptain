var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    soulDeck: { // rozszerz sobie ten obiekt i zrób z niego widok
      "soulDeckId": "201801191933450000000001",
      "soulDeckProperities": {
        "soulDeckTitle": "Wiktors' DECK",
        "soulDeckCreated": "2018.01.01"
      }
    },
    soulCard: {}, // chciałbym stworzyć element "soulDeckCards" i w niego wrzucić 'soulCard', 
    // MJ: a przypadkiem soulDeckCards nie powinno siedzieć w soulDecku powyżej? Napisałę Ci nawet komentarz : rozszerz sobie ten obiekt... 
    // MJ: czyli dodaj do niego właściwość
    admin: 0,
    loggedIn: 1,
    habits: []
  },


  methods: {
    saveUser: (e) => {
      e.preventDefault();
      if ($('userAddForm [name="password"]').val() !== $('userAddForm [name="repeatpassword"]').val()) {
        return alert('hasła się nie zgadzają');
      }
      $.ajax({
          method: 'POST',
          url: '/user',
          data: JSON.stringify({
            payload: $("#userAddForm")
          }),
          contentType: "application/json; charset=utf-8"
        })
        .then(() => {
          $('#saveUserButton').removeAttr("disabled");
          alert('user created');
        });

      $('#saveUserButton').attr("disabled", true);

      return false;
    },
    login: login
  }
});

function login(e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/login',
    data: $("#loginForm").serializeArray(),
  }).then(() => {
    app.loggedIn = 1;
    console.log('logged in');
  });
}


$(() => {
  $.get('/deck').then(function _handleResponse(response) {
    app.deck = response;
  });
}); // onload


var MockDeck = {
  "soulDeckId": "201801191933450000000001",
  "soulDeckTitle": "Wiktors' DECK",
  "soulDeckCards": [{
      "soulCardId": "00001",
      "soulCardTitle": "Proście, Szukajcie, Pukajcie",
      "soulCardSoulencje": [{
          "soulId": "001",
          "soulIdPArent": "null",
          "soulType": "text",
          "language": "PL",
          "text": "Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam. Albowiem każdy, kto prosi, otrzymuje; kto szuka, znajduje; a kołaczącemu otworzą.",
          "source": {
            "author": "Święty Mateusz",
            "created": "10",
            "source": "Bibila",
            "sourceLink": "https://pl.wikiquote.org/wiki/Ewangelia_Mateusza"
          }
        },
        {
          "soulId": "002",
          "soulIdPArent": "null",
          "soulType": "prayer",
          "language": "ENG",
          "text": "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened.",
          "source": {
            "author": "Święty Mateusz",
            "created": "10",
            "source": "Bibila",
            "sourceLink": "https://pl.wikiquote.org/wiki/Ewangelia_Mateusza"
          }
        }
      ]
    },
    {
      "soulCardId": "00002",
      "soulCardTitle": "litany against fear",
      "soulCardSoulencje": [{
          "soulId": "003",
          "soulIdParent": "null",
          "soulType": "prayer",
          "language": "EN",
          "text": "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
          "source": {
            "author": "Frank Herbert",
            "created": "1965",
            "source": "Dune",
            "sourceLink": "https://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
          }
        },
        {
          "soulId": "004",
          "soulIdPArent": "null",
          "soulType": "prayer",
          "language": "ENG",
          "text": "Nie wolno się bać. Strach zabija duszę.  Strach to mała śmierć, a wielkie unicestwienie.  Stawię mu czoło.  Niech przejdzie po mnie i przeze mnie.  A kiedy przejdzie, odwrócę oko swej jaźni na jego drogę.  Którędy przeszedł strach, tam nie ma nic. Jestem tylko ja.",
          "source": {
            "author": "Frank Herbert",
            "created": "1965",
            "source": "Dune",
            "sourceLink": "hhttps://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
          }
        }
      ]
    },
    {
      "soulCardId": "00003",
      "soulCardTitle": "my most important daily habits",
      "soulCardSoulencje": [{
          "soulId": "003",
          "soulIdPArent": "null",
          "soulType": "habit", // text, habit, image
          "language": "EN",
          "text": "meditation",
          "reason": "połączyć się ze swoją duszą",
          "source": {
            "author": "Wiktor Świątkowski",
            "created": "2018.02.23",
            "source": "Wiktorhead",
            "sourceLink": "https://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
          },
          "soulHabit": {
            "frequency": "weekly", // String, var timeSpans = ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'bi-annually']
            "interval": 84000, // Number, var timeSpansLength = [1, 24, 24*7, 24*30, 24*30 * 3 + 1.5, 24*30*12+6, 24*30*24+12]
            "times": 2, // Number,
            "lastCompleted": "", // [Date],
            "habitId": "", // String
            "habitType": "", // growth, maintenance, sustain, excite, challenge // String var habitType = ['growth', 'excite', 'sustain', 'maintenance', 'challenge']
            "when": "daily", // var whenDaily = ['wake-up', 'before breakfast', 'before noon', 'before lunch', 'after work', 'before bed' ]
          },
        },
        {
          "soulId": "004",
          "soulIdPArent": "null",
          "soulType": "habit", // text, habit, image
          "language": "EN",
          "text": "Oddychaj. Zajmuj swoją przestrzeń. Jest Twoja.",
          "reason": "Naucz się żyć w swojej przestrzeni. Zajmujesz ją będąc jej częścią. Należysz do wszechświata i wszechświat należy do Ciebie. Wyprostuj się więc, bierz głębokie oddechy, jesteś na swoim miejscu, które Ci się należy. Oddychanie jest ważne, aby czuć się dobrze. Pomaga Twojemu ciału funkcjonować i służyć Tobie. Ciało to tylko maszyna, dbaj o nie, masz tylko jedno.",
          "source": {
            "author": "Maciej Jankowski",
            "created": "2018.02.23",
            "source": "Wiktorhead",
            "sourceLink": "https://en.wikipedia.org/wiki/Bene_Gesserit#Litany_against_fear"
          },
          "soulHabit": {
            "frequency": "weekly", // String, var timeSpans = ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'bi-annually']
            "interval": 84000, // Number, var timeSpansLength = [1, 24, 24*7, 24*30, 24*30 * 3 + 1.5, 24*30*12+6, 24*30*24+12]
            "times": 2, // Number,
            "lastCompleted": "", // [Date],
            "habitId": "", // String
            "habitType": "", // growth, maintenance, sustain, excite, challenge // String var habitType = ['growth', 'excite', 'sustain', 'maintenance', 'challenge']
            "when": "daily", // var whenDaily = ['wake-up', 'before breakfast', 'before noon', 'before lunch', 'after work', 'before bed' ]
          },
        }
      ]
    }
  ]
};

app.soulDeck = MockDeck;