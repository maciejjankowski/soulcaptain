module.exports = function _defineRoutes(deps) {
  // const logger = deps.logger;
  var app;
  if (typeof deps.app === 'undefined') {
    throw new Error(
      'SoulCaptain requires app dependency.. and additional pylons.'
    );
  } else {
    app = deps.app;
  }

  // TODO refactor: funkcja app.get łyka sobie 3 zmienne z odzielnego statycznego JSONA/scheme
  app.get('/', (req, res) => {
    console.log('HALKO', req.user, 'SIEMANKO');
    let templateData = {
      title: '👻🏡 SoulHome',
      greeting: '',
      user: req.user
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('index', templateData);
  });

  app.get('/deck.html/:deckId?', (req, res) => {
    let templateData = {
      title: '🎴 Deck'
    };

    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/deck/deck.html', templateData);
  });

  app.get('/diaryAdd.html', (req, res) => {
    let templateData = {
      title: '📖 Diary'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/diary/add.html', templateData);
  });

  app.get('/diary.html', (req, res) => {
    let templateData = {
      title: '📖 Diary'
    };
    const diaryApi = require('./api/db/diary.js')(deps);
    greetUser(req, templateData);
    templateData.user = req.user;
    diaryApi
      .getDefaultDiaryList()
      .then(diaryEntries => {
        templateData.diaryEntries = diaryEntries;
        res.render('mainContent/diary/list.html', templateData);
      })
      .catch(err => {
        console.log('catch', err);
        templateData.diaryEntries = [];
        res.render('mainContent/diary/list.html', templateData);
      });
  });

  app.get('/decks.html', (req, res) => {
    let templateData = {
      title: '🎴📄 Decks'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/deck/list.html', templateData);
  });

  app.get('/deckdocument.html', (req, res) => {
    let templateData = {
      title: '🎴📄 DeckDocument'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/deck/document.html', templateData);
  });

  app.get('/deckcard.html/:cardId?', (req, res) => {
    let templateData = {
      title: '🃏 SoulCard'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/deck/card.html', templateData);
  });

  app.get('/deckcardadd.html/:deckId?', (req, res) => {
    let cardId = req.query.cardId;
    var templateData = {
      title: '🃏📝 CardAdd',
      cardId: cardId || null,
      user: req.user || {},
      cardData: {},
      greeting: greetUser(req)
    };

    if (cardId) {
      deps.mongoose.models.Card.findOne({
        _id: cardId
      })

        .then(foundCard => {
          if (foundCard) {
            console.info('found card! YAY!');
          } else {
            console.info('card not found', cardId);
          }
          templateData.cardData = foundCard;
          res.render('mainContent/deck/cardadd.html', templateData);
        })
        .catch(e => {
          console.log('not found', e);
          res.render('mainContent/deck/cardadd.html', templateData);
        });
    } else {
      console.log('no cardId specified:', cardId);
      res.render('mainContent/deck/cardadd.html', templateData);
    }
  });

  app.get(
    '/deckcardcarousel.html',
    deps.isAuthenticated,
    function showDeckCarousel(req, res) {
      let templateData = {
        title: '🃏🎠 CardCarousel'
      };
      greetUser(req, templateData);
      templateData.user = req.user;
      res.render('mainContent/deck/carousel.html', templateData);
    }
  );

  app.get('/habits.html', (req, res) => {
    let templateData = {
      title: '❌ DailyX'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/habits/habits.html', templateData);
  });

  app.get('/signup.html', (req, res) => {
    let templateData = {
      title: '✍️ Sign Up'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/signup.html', templateData);
  });

  app.get('/profile.html', (req, res) => {
    let templateData = {
      title: '👤 Profile'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/profile/profile.html', templateData);
  });

  app.get('/backlog.html', (req, res) => {
    let templateData = {
      title: '💡 Backlog'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/backlog/backlog.html', templateData);
  });

  app.get('/login.html', (req, res) => {
    let templateData = {
      title: '✅ Login'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/login.html', templateData);
  });

  app.get('/admin.html', (req, res) => {
    let templateData = {
      title: 'Dis iz adminz place'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/admin/admin.html', templateData);
  });

  app.get('/blog.html', (req, res) => {
    let templateData = {
      title: '👻🎊 SoulBlog'
    };
    greetUser(req, templateData);
    templateData.user = req.user;
    res.render('mainContent/blog/blog.html', templateData);
  });

  // this magic file loads user object into client side javascript
  app.get('/loadUserData.js', (req, res) => {
    let userDataOut = '';
    if (req && req.user) {
      req.user.password = 'makota';
      userDataOut = JSON.stringify(req.user);
    }
    res.send('const USER_DATA = ' + (userDataOut || '{}; // not logged in'));
  });

  return app;
};

function greetUser(req, templateData) {
  if (typeof templateData === 'undefined') {
    templateData = {};
  }
  if (
    req.user &&
    req.user.email &&
    req.user.personalInfo &&
    req.user.personalInfo[0] &&
    req.user.personalInfo[0].firstName
  ) {
    templateData.greeting = 'Hello, 👩‍💻 ' + req.user.personalInfo[0].firstName;
  } else {
    templateData.greeting = 'Oh, hi there! Please';
  }
  return templateData.greeting; // TODO 'refactor this because it should not modify the
  // original greeting, but simply return a value'
}
