module.exports=function(app, habitsModel){
  app.post('/habits', app.isAuthenticated, (req, res) => {
    habitsModel.model();
  });
}