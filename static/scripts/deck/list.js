// import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    selectedCard: 0,
    soulDeck: {},
    soulDecks: [],
  },
  methods: {

  }
});

$(function _onload() {
  $.get('/decks').then(function _handleResponse(response) {
    app.soulDecks = response;
  });
}); // onload