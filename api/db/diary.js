module.exports = function(deps) {
  let mongoose = deps.mongoose;

  const User = mongoose.models.user;
  const DiaryEntry = mongoose.models.diaryEntry;
  const Card = mongoose.models.Card;
  return {
    saveDiary: function(diaryBody) {
      return new Promise((resolve, reject) => {
        let owner = diaryBody.owner;
        console.log('owner', owner);

        let lines = diaryBody.text.split('\n');

        function createSoulencja(text) {
          return {
            text: text,
            context: ['diary']
          };
        }
        let soulencje = lines.map(createSoulencja);

        let cardBody = {
          soulCardTitle: diaryBody.text,
          soulCardSoulencje: soulencje,
          context: ['diary']
        };

        let diaryCard = new Card(cardBody);
        diaryCard.createdAt = new Date();
        diaryCard.modifiedAt = new Date();
        diaryCard
          .save()
          .then(savedDiary => {
            if (owner.defaultDeck) {
              owner.defaultDeck.cards.push(savedDiary._id);
            } else {
              owner.decks[0].cards.push(savedDiary._id);
            }
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
