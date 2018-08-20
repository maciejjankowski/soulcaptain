var app = new Vue({
  el: '#app',
  data: {
    maxEncjeToShow: 5,
    selectedCard: 0,
    cardEditMode: false,
    deckEditMode: false,
    cardEditIndex: 0,
    soulDeck: { cards: [] },
    soulDecks: USER_DATA.decks || [],
    soulCard: {},
    admin: 0,
    loggedIn: 1,
    habits: []
  },
  methods: {
    toggleReason: encja => {
      encja.showReason = !encja.showReason;
    },
    shuffleManifest: card => {
      let repetitions = 5;
      while (repetitions--) {
        let cardsLength = card.soulCardSoulencje.length;
        let randomIndex = Math.round(Math.random() * cardsLength);
        let tempCard = card.soulCardSoulencje.splice(randomIndex, 1).pop();
        card.soulCardSoulencje.unshift(tempCard);
      }
    },
    saveUser: e => {
      e.preventDefault();
      console.warn('czy to w ogóle jest poczebne?');
      if (
        $('userAddForm [name="password"]').val() !==
        $('userAddForm [name="repeatpassword"]').val()
      ) {
        return alert('hasła się nie zgadzają');
      }
      $.ajax({
        method: 'POST',
        url: '/user',
        data: JSON.stringify({
          payload: $('#userAddForm')
        }),
        contentType: 'application/json; charset=utf-8'
      }).then(() => {
        $('#saveUserButton').removeAttr('disabled');
        alert('user created');
      });

      $('#saveUserButton').attr('disabled', true);

      return false;
    },
    login: login,
    getDeck: () => {
      console.warn('deprecared');
      $.get('/deck/1').then(function _handleResponse(response) {
        app.soulDeck = response;
      });
    },
    // saveDeck : saveDeck,
    enterEditForm: (card, cardIndex) => {
      app.cardEditMode = true;
      app.cardEditIndex = cardIndex;
    },
    exitEditForm: card => {
      app.cardEditMode = false;
      app.cardEditIndex = 0;
      if (card && card._id) {
        saveCard(card);
      }
    },
    enterDeckEdit: () => {
      app.deckEditMode = true;
    },
    exitDeckEdit: () => {
      app.deckEditMode = false;
      if (app.cardEditMode) {
        app.cardEditMode = false;
        app.cardEditIndex = 0;
      }
    },
    moveUp: cardIndex => {
      var old = app.soulDeck.cards.splice(cardIndex, 1).pop();
      app.soulDeck.cards.splice(Math.max(0, cardIndex - 1), 0, old);
      saveDeck(app.soulDeck);
    },
    moveDn: cardIndex => {
      var old = app.soulDeck.cards.splice(cardIndex, 1).pop();
      app.soulDeck.cards.splice(
        Math.min(app.soulDeck.cards.length, cardIndex + 1),
        0,
        old
      );
      saveDeck(app.soulDeck);
    }
  }
});

if (USER_DATA.decks) {
  var deckId = location.href
    .split('/')
    .pop()
    .replace(/#.+/, '')
    .replace(/\?.+/, '');
  app.deckId = deckId;
  if (deckId.match(/[a-z0-9]{24}/)) {
    console.log('deckId', deckId);
    app.soulDeck = USER_DATA.decks.find(deck => deck._id === deckId) || {};
  } else {
    if (USER_DATA.decks.length) {
      console.log('selecting first default deck');
      USER_DATA.decks[0].cards.forEach(card => {
        card.soulCardSoulencje.forEach(encja => (encja.showReason = false));
      });
      app.soulDeck = USER_DATA.decks[0];
      app.deckId = USER_DATA.decks[0]._id; // deckId;
    }
  }
}

function saveDeck(deck) {
  if (typeof deck === 'undefined') {
    return console.error('error saving');
  }
  let newDeck = {};
  let cards = deck.cards.map(card => card._id);
  Object.assign(newDeck, deck);
  newDeck.cards = cards;
  $.ajax({
    method: 'POST',
    url: '/deck/' + deck._id,
    data: JSON.stringify(newDeck),
    contentType: 'application/json; charset=utf-8'
  }).then(() => {
    // console.info('saved');
  });
}

function saveCard(card) {
  console.log(card.soulCardSoulencje);
  $.ajax({
    method: 'POST',
    url: '/card/' + card._id,
    data: JSON.stringify(card),
    contentType: 'application/json; charset=utf-8'
  }).then(() => {
    console.info('saved', card.soulCardSoulencje);
  });
}

function cardDelete(deckId, cardId) {
  // task https://gitlab.com/maciejjankowski/soulcaptain/issues/101
  if (confirm('Delete card? You sure?') === true) {
    console.log('users says OK');
  } else {
    console.log('user says CANCEL');
    return;
  }
  console.warn(cardId);
  $.ajax({
    method: 'DELETE',
    url: '/deck/' + deckId + '/card/' + cardId,
    contentType: 'application/json; charset=utf-8'
  }).then(() => {
    console.info('Deleted card', cardId, 'from deck', deckId);
    let cardIndex = app.soulDeck.cards.findIndex(e => e._id === cardId);
    app.soulDeck.cards.splice(cardIndex, 1);
  });
}

function login(e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/login',
    data: $('#loginForm').serializeArray()
  }).then(() => {
    app.loggedIn = 1;
    console.log('logged in');
  });
}

// Navbar js
// el.classList.add(className); i tutaj 'el' to 'document.getElementById("leftNavbar")'
function closeNav() {
  document.getElementById('leftNavbar').classList.add('hideNavbarLeft');
  document.getElementById('closeNavButton').classList.add('hideButton');
  document.getElementById('openNavButton').classList.remove('hideButton');
}

function openNav() {
  document.getElementById('leftNavbar').classList.remove('hideNavbarLeft');
  document.getElementById('openNavButton').classList.add('hideButton');
  document.getElementById('closeNavButton').classList.remove('hideButton');
}
