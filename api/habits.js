module.exports=function(app, habitsModel){
  app.post('/habits', app.isAuthenticated, (req, res) => {
      if (req.data.payload && req.data.payload.length){
          req.data.payload.habits.forEach((habit) => {
              habitsModel.findOne({habit.id}).then((foundHabit) => {
                  foundHabit.lastUpdated = Date.now();
                  foundHabit.save().then(()=>{
                      res.send("OK");
                  }).fail(() => {
                      res.send('ERR');
                  });
              })
          })
      }
  });
}
