// import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    selectedCard: 0,
    soulDeck: {},
    soulDecks: []
  },
  methods: {
    createNewDeck: () => {
      var request = new XMLHttpRequest();
      request.open('POST', '/deck', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );
      app.soulDeck.owner = USER_DATA._id;
      let payload = JSON.stringify(app.soulDeck);
      request.send(payload);
      request.onload = function() {
        var resp = this.response;
        if (this.status >= 200 && this.status < 400) {
          app.soulDeck = JSON.parse(resp);
          console.log('received', resp);
        } else {
          console.log('error of any sort', this.response);
        }
      };
      request.onerror = function() {
        console.error('connection error', this);
      };
    }
  }
});

$(function _onload() {
  $.get('/decks').then(function _handleResponse(response) {
    // app.soulDecks = response;
  });
}); // onload
