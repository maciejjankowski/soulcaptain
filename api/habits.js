module.exports=function(app, habitsModel){
  app.post('/habits', app.isAuthenticated, function(req, res){
    habitsModel.model();
  });
}