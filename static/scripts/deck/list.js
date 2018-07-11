// import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    selectedCard: 0,
    cardEditMode: false,
    deckEditMode: false,
    cardEditIndex: 0,
    soulDeck: {},
    soulDecks: [],
    soulCard: {},
    admin: 0,
    loggedIn: 1,
    habits: []
  },
  methods: {

  }
});

$(function _onload() {

  $.get('/decks').then(function _handleResponse(response) {
    app.soulDecks = response;

  });

}); // onload