var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    soulCard : {},
    soulencja : {}
  }
})




$(()=>{
  
  $.get('/deck').then(_handleResponse);
  
  function _handleResponse(response){
    app.soulCard = response;
    console.log(response)
  }
  
  $.get('/soulencja').then(function _handleResponse(response){
    app.soulencja = response;
    console.log(response)
  });
  
  // $.post('/card2',{})
  
  
  



})
//setTimeout(()=>app.message = 'Hello Captain!', 1000);