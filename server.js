const express = require('express');
const app = express();

require('dotenv').load();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const mail = require('./api/email.js');
// const bcrypt = require('bcrypt');
// const sms = require('./api/sms.js');

const mongoConnString = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`;
mongoose.connect(mongoConnString);
mongoose.Promise = global.Promise;


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.locals.delimiters = '<% %>';
app.locals.tags = '<% %>';

app.use(express.static('static'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

app.use(session({
	secret: process.env.SESSIONSECRET,
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	resave: true, saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const logger = require('./logger.js')();

// DOC using passport: https://stackoverflow.com/questions/45381931/basics-of-passport-session-expressjs-why-do-we-need-to-serialize-and-deseriali
const deps = { //TODO dependencies object passed to every require function (poor mans dependency injection)
	app,
	mongoose,
	passport,
	isAuthenticated,
	logger
};

const schema = require('./api/schema.js')(deps);
// TODO passport rename to stampedPassport
require('./api/passport.js')(deps);
require('./api/login.js')(app);
require('./api/deck.js')(deps);
require('./api/habits.js')(app);
require('./api/user.js')(deps);
require('./routes.js')(deps);

var listener = app.listen(process.env.PORT || 9000, function () {
	logger.info('SoulCaptain is listening on port ' + listener.address().port);
});

/**
 * Login Required middleware.
 */
function isAuthenticated(req, res, next) {

	// TODO wyświetlanie komunikatów jako Bootstrap Alerts
	logger.info('SoulCaptain is testing your login');
	if (req.isAuthenticated()) {
		logger.info('SoulCaptain says that login is ok');
		return next();
	} else {

		logger.info('SoulCaptain says that you are not logged in');

		if (req.headers['content-type'] === 'application/json; charset=UTF-8') {
			res.status(403).send('Soul captain asks you kindly to log in');
		} else {
			res.redirect('/login.html');
		}
	}
}

app.isAuthenticated = isAuthenticated;
/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
	const provider = req.path.split('/').slice(-1)[0];
	const token = req.user.tokens.find(token => token.kind === provider);
	if (token) {
		next();
	} else {
		res.redirect(`/auth/${provider}`);
	}
};

