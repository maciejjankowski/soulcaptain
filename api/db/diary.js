var getSoulencjaSeedData = function(opts, text, reason) {
  return {
    soulIdParent: '',
    soulType: '', // "nie wiem co to jest, do wywalenia"
    language: '',
    text: text || '',
    media: [],
    links: [],
    reason: reason || '',
    habit: {
      habitType: '', // ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
      displayType: '',
      frequency: '', // ['just once', hourly','daily','weekly','monthly','quarterly','annually','bi-annually']
      timePreference: [], // select date/time, select place, at mornings, mid-day, lunch, end-of-day, weekend, laetr today, next week, next weekend, sunday, end of month, end of year, some day
      locationPreference: [], // home, work, specific place, club, restaurant, location, country
      coolDown: '', // czas do następnego powtórzenia - kiedy nie pokazywać karty
      timestamps: [Date.now()]
    },
    context: opts.context || [], // task, thought, diary entry, manifest
    tags: [],
    moods: opts.moods || [],
    source: {
      author: '',
      created: Date.now(),
      source: '',
      sourceLink: ''
    }
  };
};


module.exports = function (deps) {
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

        let soulencje = lines.map(getSoulencjaSeedData.bind(this, {context : ['diary']}));

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
