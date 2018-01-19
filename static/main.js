var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    soulDeck : { // rozszerz sobie ten obiekt i zrób z niego widok
      "soulDeckId" : "201801191933450000000001",
      "soulDeckTitle" : "Wiktors' DECK",
      "obiekt" : {"pole" : "tekst pola"} 
    },
    soulCard : {},
    admin : 0,
    loggedIn : 1
  },
  methods : {
    saveUser: (e) => {
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
      });
      
      $('#saveUserButton').attr("disabled", true);
      e.preventDefault();
      return false;
    }
  }
})


$(()=>{
  
  $.get('/deck').then(function _handleResponse(response){
    app.soulDeck.soulCards = [response, response];
    app.soulCard = response;
    console.log(response)
  });
    

}) // onload
