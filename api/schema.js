// TODO @maciej dodać do sheme isHabitable czyli dodać wszelkie inforamcje potrzebne by zrobić odhaczankę posługując się tym modelem
module.exports = function(deps) {
  const mongoose = deps.mongoose;
  const Card = mongoose.model(
    'Card', // http://mongoosejs.com/docs/guide.html
    {
      soulCardTitle: String,
      soulCardSoulencje: [
        {
          soulIdParent: String,
          soulType: String, // "nie wiem co to jest, do wywalenia"
          language: String,
          text: String,
          media: [
            {
              url: String,
              type: String, // image, video, audio,
              text: String
            }
          ],
          links: [
            {
              url: String,
              text: String
            }
          ],
          reason: String,
          habit: {
            habitType: String, // ['growth', 'excite', 'sustain', 'maintenance', 'challenge'];
            displayType: String,
            frequency: String, // ['just once', hourly','daily','weekly','monthly','quarterly','annually','bi-annually']
            timePreference: [String], // select date/time, select place, at mornings, mid-day, lunch, end-of-day, weekend, laetr today, next week, next weekend, sunday, end of month, end of year, some day
            locationPreference: [String], // home, work, specific place, club, restaurant, location, country
            coolDown: String, // czas do następnego powtórzenia - kiedy nie pokazywać karty
            timestamps: [Date]
          },
          context: [String], // task, thought, diary entry
          tags: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'tag'
            }
          ],
          moods: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'mood'
            }
          ],
          source: {
            author: String,
            created: Date,
            source: String,
            sourceLink: String
          }
        }
      ],
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  );
  const Feeling = mongoose.model('Feeling', {
    name: String,
    description: String,
    influence: String, // internal, external influence
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
      }
    ] //
  });
  const Tag = mongoose.model('Tag', {
    name: String
  });
  const User = mongoose.model('User', {
    loginId: String,
    loginType: String,
    email: String,
    password: String,
    personalInfo: [
      {
        firstName: String,
        lastName: String
      }
    ],
    decks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
      }
    ],
    defaultDeck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deck'
    },
    diary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'diaryEntry'
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
      }
    ]
  });

  const Deck = mongoose.model('Deck', {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: String,
    description: String,
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
      }
    ]
  });

  const diaryEntry = mongoose.model('diaryEntry', {
    diaryDate: Date,
    diaryNote: String,
    diaryMood: String,
    moodList: [String],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  return {
    User,
    Card,
    Deck,
    Feeling,
    Tag,
    diaryEntry
  };
};
