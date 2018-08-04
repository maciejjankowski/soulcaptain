var app = new Vue({
  el: '#appContainer',
  data: {
    diary: USER_DATA.diary || []
  },
  methods: {
    deleteEntry: function(entryId) {
      var request = new XMLHttpRequest();
      request.open('DELETE', '/diary/' + entryId, true);
      request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      );
      request.send();
      const foundIndex = app.entries.findIndex(el => el._id === entryId);
      request.onload = function() {
        console.log('TODO'); // TODO - just finish it
        app.entries.splice(foundIndex, 1);
      };
    }
  }
});
