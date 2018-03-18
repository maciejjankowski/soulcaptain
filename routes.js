module.exports = function _defineRoutes(deps) {
	var app;
	if (typeof deps.app === 'undefined') {
		throw new Error('requires app dependency');
	} else {
		app = deps.app;
	}

	app.get('/', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('index', templateData);
	}); 
	app.get('/deck.html', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('deck.html', templateData);
	});

	app.get('/deckcard.html', (req, res) => {
		let templateData = {title : '🃏 Single Card'};
		res.render('deckcard.html', templateData);
	});

	app.get('/habits.html', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('habits.html', templateData);
	});

	app.get('/signup.html', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('signup.html', templateData);
	});

	app.get('/login.html', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('login.html', templateData);
	});

	app.get('/admin.html', (req, res) => {
		let templateData = {title : 'XYZ'};
		res.render('admin.html', templateData);
	});

	return app;
};
