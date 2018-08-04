module.exports = function(deps) {
  let mongoose = deps.mongoose;
  const DiaryEntry = mongoose.models.diaryEntry;
  return {
    saveDiary: function(diaryBody) {
      return new Promise((resolve, reject) => {
        let diaryEntry = new DiaryEntry(diaryBody);
        diaryEntry.diaryDate = new Date();
        diaryEntry.save(function(err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }, // saveDiary
    getDefaultDiaryList: function(userId) {
      return new Promise((resolve, reject) => {
        DiaryEntry.find({ owner: userId })
          .limit(30)
          .then(resolve)
          .catch(reject);
      });
    }
  };
}; // module exports
