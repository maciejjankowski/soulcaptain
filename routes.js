module.exports = function _defineRoutes(deps) {
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
		let templateData = {
			title: '👻 Soulcaptain 🏡 Home',
			greeting: ''
		};
		greetUser(req, templateData);
		templateData.user = req.user;
		res.render('index', templateData);
	});
	
	app.get('/deck.html', (req, res) => {
		let templateData = {title: '🎴 Deck'};
		greetUser(req, templateData);
		templateData.user = req.user;
		console.log(templateData.user, 'tu zoba co siedzi');
		res.render('deck.html', templateData);
	});
	
	app.get('/deckdocument.html', (req, res) => {
		let templateData = {title: '🎴 📄 Deck Document'};
		greetUser(req, templateData);
		res.render('deckdocument.html', templateData);
	});
	
	app.get('/deckcard.html', (req, res) => {
		let templateData = {title: '🃏 Single Card'};
		greetUser(req, templateData);
		res.render('deckcard.html', templateData);
	});
	
	app.get('/deckcardadd.html', (req, res) => {
		let templateData = {title: '📝 🃏 DeckCardAdd'};
		greetUser(req, templateData);
		res.render('deckcardadd.html', templateData);
	});
	
	app.get(
		'/deckcardcarousel.html',
		deps.isAuthenticated,
		function showDeckCarousel(req, res) {
			let templateData = {title: '🎠 🃏 DeckCardCarousel'};
			greetUser(req, templateData);
			res.render('deckcardcarousel.html', templateData);
		}
	);
	
	app.get('/habits.html', (req, res) => {
		let templateData = {title: '❌ DailyX'};
		greetUser(req, templateData);
		res.render('habits.html', templateData);
	});
	
	app.get('/signup.html', (req, res) => {
		let templateData = {title: '✍️ Sign Up'};
		greetUser(req, templateData);
		res.render('signup.html', templateData);
	});
	
	app.get('/login.html', (req, res) => {
		let templateData = {title: '✅ Login'};
		greetUser(req, templateData);
		res.render('login.html', templateData);
	});
	
	app.get('/admin.html', (req, res) => {
		let templateData = {title: 'Dis iz adminz place'};
		greetUser(req, templateData);
		res.render('admin.html', templateData);
	});
	
	
	return app;
};

function greetUser(req, templateData) {
	if (req.user && req.user.email) {
		templateData.greeting = 'Hello, 👩‍💻 ' + req.user.personalInfo[0].firstName;
	} else {
		templateData.greeting = 'Please';
	}
}
