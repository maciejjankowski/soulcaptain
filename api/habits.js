module.exports=function(app, mongoose, isAuthenticated){
  
  let habits = mongoose.model('habit', {
    "frequency": String,
    "interval" : Number,
    "name": String,
    "times": Number,
    "type": String,
   });
  
  app.post('/habits', (req, res) => {
      if (req.body && req.body.payload && req.body.payload.length){
        let count = req.body.payload.length;
          req.body.payload.forEach((habit) => {
              habits.findOne({"id" : habit.id}).then((foundHabit) => {
                if (foundHabit){
                  foundHabit.lastUpdated = Date.now();
                  foundHabit.save().then(()=>{
                    count--;
                    if (!count)  
                      res.send("OK");
                  }).catch(() => {
                    count--;
                    res.send('ERR');
                  });
                } else {
                  count--;
                  let newHabit = new habits(habit);
                  newHabit.save();
                  if (!count)  
                    res.send("OK");
                }
                  
              });
            
          })
      }
  });
}
