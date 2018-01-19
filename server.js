const express = require('express');
const app = express();

const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mailer = require('./email.js')();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(express.static('static'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: process.env.SESSIONSECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true, saveUninitialized: true 
}));

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`, { useMongoClient: true });
mongoose.Promise = global.Promise;


const Card = mongoose.model('Card', // http://mongoosejs.com/docs/guide.html
{  
   "coulCardId" : String,
   "soulCardTitle" : String,
   "soulCardSoulencje" : [  
      {  
         "soulIdParent" : String,
         "soulType" : String,
         "language" : String,
         "text" : String,
         "source":{  
            "author" : String,
            "created" : Date,
            "source" : String,
            "sourceLink" : String
         }
      }
   ],
  owner : String
});

const User = mongoose.model('User', {  
  "loginId" : String,
  "loginType":String,
  "email" : String,
  "password":String,
  "personalInfo" : [  
     {  
       "firstName" : String,
       "lastName" : String,
     }
   ]
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/deck',(req, res) => {
  Card.findOne().then((cards) => {
    res.send(cards);
  });
});



app.get('/testx',(req, res) => {
  let data = {
      testField : "testValue"
  }
  res.send('OK');
  res.render("password", data, function(err, body){
    if (err) return console.error(err);
    mailer('maj1337@gmail.com', 'subject', body, 'this is just a text');
  });
});


app.post('/card2', (req, res) => {
  var cardData = {};
  var card = new Card(cardData)
  
  card.save(function (err) {
    if (err) {
      console.log(err);
      res.send(400, {status:'error',error: 'problem saving', details : err})
    } else {
      res.send({status:'ok'});
    }
  }); // card save  
}) 

app.post('/deck/:id/soulencja', (req, res)=>{

})
const bcrypt = require('bcrypt');

app.post('/user', (req, res)=>{
  let fields = req.body.payload;
  let userForm = {};
  let validFields = "email password firstName".split(" ");
  Object.keys(fields).forEach((index) => {
    // console.log(field, field.name, field.value)
    if (validFields.indexOf(fields[index].name) > -1){
        userForm[fields[index].name] = fields[index].value;
    }
  });
  
  User.findOne({loginId : userForm.email}).then((user)=>{
    if (user){
      console.log(user)
      testPassword(user.password, (err)=>{
        if (err) return console.log('no matchy');
        console.log('login ok', user);
        res.send('OK')
      });
    } else {
      bcrypt.hash(userForm.password, 10, function(err, pwhash) {
        let newUser = new User({
          loginId : userForm.email,
          loginType : "email",
          email : userForm.email,
          password : pwhash
        }).save();
      });
    };
  });
  
  res.send("OK")
}) // post user

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  });
}));

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send({ user: req.user });
  });

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

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

function testPassword(hash, cb){
  bcrypt.compare('myPassword', hash, function(err, res) {
    if(res) {
      cb(null);
      console.log('match');
    } else {
      cb(1);
      console.error('no match');
     // Passwords don't match
    } 
  });
}
