const express = require('express');
const app = express();

require('dotenv').load();
const mongoose = require('mongoose');
const passport = require('passport');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mail = require('./email.js');
const bcrypt = require('bcrypt');
const sms = require('./sms.js');

const mongoConnString = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`;
mongoose.connect(mongoConnString, { useMongoClient: true });
mongoose.Promise = global.Promise;


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.locals.delimiters = '<% %>';
app.locals.tags = '<% %>';

app.use(express.static('static'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

app.use(session({
  secret: process.env.SESSIONSECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true, saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// using passport: https://stackoverflow.com/questions/45381931/basics-of-passport-session-expressjs-why-do-we-need-to-serialize-and-deseriali
const schema = require('./api/schema.js')(mongoose);
const deps = { // dependencies object passed to every require function (poor mans dependency injection)
  app,
  mongoose,
  passport,
  isAuthenticated
}

require('./api/passport.js')(mongoose, passport);
require('./api/login.js')(app, passport);
require('./api/deck.js')(app, mongoose);
require('./api/habits.js')(app, mongoose, isAuthenticated);
require('./api/user.js')(app, mongoose, passport);
require('./routes.js')(deps);

var listener = app.listen(process.env.PORT || 9000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

/**
 * Login Required middleware.
 */
function isAuthenticated(req, res, next){

  console.log('testing for login');
  if (req.isAuthenticated()) {
    console.log('login ok');
    return next();
  } else{

    console.log('missing login');

    if (req.headers['content-type'] === "application/json; charset=UTF-8"){
      res.status(403).send("please log in");
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

