module.exports = function _defineRoutes(deps){
  if (typeof deps['app'] === 'undefined'){
    throw new Error('requires app dependency');
  } else {
    var app = deps.app;
  }
  
  app.get('/', (req, res) => {
    res.render('index');
  });
  
   app.get('/deck.html', (req, res) => {
    res.render('deck.html');
  });
  
  return app
}