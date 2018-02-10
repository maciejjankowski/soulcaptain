module.exports=function(app, mongoose, isAuthenticated){
var timeSpansLength = [1, 24, 24*7, 24*30, 24*30 * 3 + 1.5, 24*30*12+6, 24*30*24+12]
var timeSpans = ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'bi-annually']
var habitType = ['growth', 'excite', 'sustain', 'maintenance', 'challenge']

const Habit = mongoose.models['Habit'];
  /*
  expect(req.body.payload).to.beArray()
  expect(req.body.payload[0]).to.have(idProperty)
  */
  app.post('/habits', (req, res) => {
      if (req.body && req.body.payload && req.body.payload.length){
        let count = req.body.payload.length;
          req.body.payload.forEach((habit) => {
            console.log('habit', JSON.stringify(habit,null,2))
              Habit.findOne({"id" : habit.habitId}).then((foundHabit) => {
                // /* expect(foundHabit).not.to.be.empty() */
                if (foundHabit){
                  foundHabit.lastCompleted.push(Date.now());
                  foundHabit.save().then(()=>{
                    count--;
                    if (!count)  
                      res.send("OK");
                  }).catch((err) => {
                    console.log('error saving', err);
                    count--;
                    if (!count)  
                      res.send('ERR');
                  });
                } else {
                  count--;
                  console.log('habit', JSON.stringify(habit,null,2))
                  let newHabit = new Habit(habit);
                  newHabit.lastCompleted = [Date.now()];
                  newHabit.save().then(()=>{console.log('saved')});
                  if (!count)  
                    res.send("OK");
                }
                  
              });
            
          })
      }
  });
}
