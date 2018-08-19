// TODO "wciągać poprawne wartości z obiektu"
var getSoulencjaSeedData = function() {
  return {
    soulIdParent: '',
    soulType: '', // "nie wiem co to jest, do wywalenia"
    language: '',
    text: '',
    media: [],
    links: [],
    reason: '',
    habit: {
      habitType: '', // ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
      displayType: '',
      frequency: '', // ['just once', hourly','daily','weekly','monthly','quarterly','annually','bi-annually']
      timePreference: [], // select date/time, select place, at mornings, mid-day, lunch, end-of-day, weekend, laetr today, next week, next weekend, sunday, end of month, end of year, some day
      locationPreference: [], // home, work, specific place, club, restaurant, location, country
      coolDown: '', // czas do następnego powtórzenia - kiedy nie pokazywać karty
      timestamps: [Date.now()]
    },
    context: [], // task, thought, diary entry, manifest
    tags: [],
    moods: [],
    source: {
      author: '',
      created: Date.now(),
      source: '',
      sourceLink: ''
    }
  };
};

var cardSeedData = {
  soulCardTitle: 'SoulCard Title',
  soulCardText: 'SoulCard text',
  soulCardAuthor: 'SoulCard author',
  soulCardSoulencje: [getSoulencjaSeedData()]
};

Object.assign(cardSeedData, populatedCardData);

var app = new Vue({
  el: '#cardadder',
  data: {
    payload: 'Here will appear your SoulCard schema :D',
    deckId: '',
    cardData: cardSeedData
    // soulCardText : "XYZ",
    // soulCardAuthor : "XXY"
  },
  methods: {
    addNewSoulencja: function() {
      app.cardData.soulCardSoulencje.push(getSoulencjaSeedData());
    },
    deleteSoulencja: function(soulencjaIndex) {
      app.cardData.soulCardSoulencje.splice(soulencjaIndex, 1);
    },
    saveCard: function() {
      var request = new XMLHttpRequest();
      request.open('POST', '/deck/' + app.deckId + '/card', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );
      let payload = JSON.stringify(app.cardData);
      request.send(payload);
      request.onload = function() {
        if (this.readyState !== 4) {
          return;
        }
        var resp = this.response;
        if (this.status >= 200 && this.status < 400) {
          console.log('received', resp);
        } else {
          console.log('error of any sort', this.response);
        }
      };
      request.onerror = function() {
        console.error('connection error', this);
      };

      if (request.status >= 400) {
        console.log('pińcetka');
      }
    },
    cardpost: function() {
      let payload = app.payload;
      console.log('W tej chwili do backendu leci:', app.payload);
      var request = new XMLHttpRequest();
      request.open('POST', '/deck/' + app.deckId + '/card', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );
      request.send(payload);

      if (request.status >= 400) {
        console.log('pińcetka');
      }
    }
  }
});

if (USER_DATA.decks) {
  var deckId = location.href
    .split('/')
    .pop()
    .replace(/#.+/, '')
    .replace(/\?.+/, '');

  if (deckId.match(/[a-z0-9]{24}/)) {
    console.log('deckId', deckId);
    app.deckId = deckId;
  }
}

// TODO wczytywanie danych z istniejącej karty celem ładowania do formularza
