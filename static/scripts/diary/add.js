var app = new Vue({
  el: '#app',
  data: {
    diary: {
      // diaryDate: '',
      diaryNote: '',
      diaryMood: ''
    },
    soulDecks: USER_DATA.decks || []
  },
  methods: {
    saveDiary: function() {
      var request = new XMLHttpRequest();
      request.open('POST', '/diary', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );
      request.send(JSON.stringify(app.diary));
    }
  }
});
