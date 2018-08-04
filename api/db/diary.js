module.exports = function(deps) {
  let mongoose = deps.mongoose;

  const User = mongoose.models.user;
  const DiaryEntry = mongoose.models.diaryEntry;
  return {
    saveDiary: function(diaryBody) {
      return new Promise((resolve, reject) => {
        let owner = diaryBody.owner;
        console.log('owner', owner);
        let diaryEntry = new DiaryEntry(diaryBody);
        diaryEntry.diaryDate = new Date();
        diaryEntry
          .save()
          .then(savedDiary => {
            console.log('owner after new diary entry', owner);
            owner.diary.push(savedDiary._id);
            owner.save();
            resolve(savedDiary);
          })
          .catch(reject);
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
