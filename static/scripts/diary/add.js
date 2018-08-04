var app = new Vue({
  el: '#diaryadder',
  data: {
    diary: {
      // diaryDate: '',
      diaryNote: '',
      diaryMood: ''
    }
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
