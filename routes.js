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
		console.log('HALKO', req.user, 'SIEMANKO')
		let templateData = {
			title: '👻🏡 SoulHome',
			greeting: '',
			user: req.user
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('index', templateData);
	});

	app.get('/deck.html', (req, res) => {
		let templateData = {
			title: '🎴 Deck'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('deck.html', templateData);
	});

	app.get('/diary.html', (req, res) => {
		let templateData = {
			title: '📖 Diary'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('diary.html', templateData);
	});

	app.get('/deckdocument.html', (req, res) => {
		let templateData = {
			title: '🎴📄 DeckDocument'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('deckdocument.html', templateData);
	});

	app.get('/deckcard.html', (req, res) => {
		let templateData = {
			title: '🃏 SoulCard'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('deckcard.html', templateData);
	});

	app.get('/deckcardadd.html', (req, res) => {
		let cardId = req.query.cardId;
		var templateData = {
			title: '🃏📝 CardAdd',
			cardId : cardId || null,
			user : req.user || {},
			cardData : {},
			greeting : greetUser(req)
		};
		
		if (cardId) {
			deps.mongoose.models.Card.findOne({_id : cardId})
				.then((foundCard) => {
					if (foundCard){
						console.info('found card! YAY!');
					} else {
						console.info('card not found', cardId);
					}
					templateData.cardData = foundCard;
					res.render('deckcardadd.html', templateData);
				}).catch(e => {
					console.log('not found', e)
					res.render('deckcardadd.html', templateData);
				});
		} else {
			console.log('no cardId specified:', cardId)
			res.render('deckcardadd.html', templateData);
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
			res.render('deckcardcarousel.html', templateData);
		}
	);

	app.get('/habits.html', (req, res) => {
		let templateData = {
			title: '❌ DailyX'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('habits.html', templateData);
	});

	app.get('/signup.html', (req, res) => {
		let templateData = {
			title: '✍️ Sign Up'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('signup.html', templateData);
	});

	app.get('/login.html', (req, res) => {
		let templateData = {
			title: '✅ Login'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('login.html', templateData);
	});

	app.get('/admin.html', (req, res) => {
		let templateData = {
			title: 'Dis iz adminz place'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('admin.html', templateData);
	});

	app.get('/blog.html', (req, res) => {
		let templateData = {
			title: '👻🎊 SoulBlog'
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('blog.html', templateData);
	});
	return app;
};

function greetUser(req, templateData) {
	if (typeof templateData === 'undefined'){
		templateData = {};
	}
	if (req.user &&
		req.user.email &&
		req.user.personalInfo &&
		req.user.personalInfo[0] &&
		req.user.personalInfo[0].firstName) {
		templateData.greeting = 'Hello, 👩‍💻 ' + req.user.personalInfo[0].firstName;
	} else {
		templateData.greeting = 'Oh, hi there! Please';
	}
	return templateData.greeting; // TODO 'refactor this because it should not modify the 
	// original greeting, but simply return a value'
}