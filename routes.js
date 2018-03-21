module.exports = function _defineRoutes(deps) {
<<<<<<< HEAD
  if (typeof deps.app === "undefined") {
    throw new Error("requires app dependency");
  } else {
    var app = deps.app;
  }

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/deck.html", (req, res) => {
    res.render("deck.html");
  });

  app.get("/deckcard.html", (req, res) => {
    res.render("deckcard.html");
  });

  app.get("/habits.html", (req, res) => {
    res.render("habits.html");
  });

  app.get("/signup.html", (req, res) => {
    res.render("signup.html");
  });

  app.get("/login.html", (req, res) => {
    res.render("login.html");
  });
  
  app.get("/admin.html", (req, res) => {
    res.render("admin.html");
  });

  return app;
};
=======
	var app;
	if (typeof deps.app === 'undefined') {
		throw new Error('requires app dependency');
	} else {
		app = deps.app;
	}

	app.get('/', (req, res) => {
		let templateData = {title : '👻 Soulcaptain 🏡 Home'};
		res.render('index', templateData);
	}); 

	app.get('/deck.html', (req, res) => {
		let templateData = {title : '🎴 Deck'};
		templateData.user = req.user;
		res.render('deck.html', templateData);
	});

	app.get('/deckcard.html', (req, res) => {
		let templateData = {title : '🃏 Single Card'};
		res.render('deckcard.html', templateData);
	});

	app.get('/deckcardadd.html', (req, res) => {
		let templateData = {title : '📝 🃏 DeckCardAdd'};
		res.render('deckcardadd.html', templateData);
	});

	app.get('/deckcardcarousel.html', (req, res) => {
		let templateData = {title : '🎠 🃏 DeckCardCarousel'};
		res.render('deckcardcarousel.html', templateData);
	});

	app.get('/habits.html', (req, res) => {
		let templateData = {title : '❌ DailyX'};
		res.render('habits.html', templateData);
	});

	app.get('/signup.html', (req, res) => {
		let templateData = {title : '✍️ Sign Up'};
		res.render('signup.html', templateData);
	});

	app.get('/login.html', (req, res) => {
		let templateData = {title : '✅ Login'};
		res.render('login.html', templateData);
	});

	app.get('/admin.html', (req, res) => {
		let templateData = {title : 'Dis iz adminz place'};
		res.render('admin.html', templateData);
	});


	return app;
};
>>>>>>> 25fa46a572b13d05be7f10d33fc739fda2823d12
