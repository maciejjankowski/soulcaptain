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
const mail = require('./email.js');
const bcrypt = require('bcrypt');
const compression = require('compression');
const sms = require('./sms.js');


mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(compression());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
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

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    console.log('passport login', password, user.password);
    testPassword(password, user.password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        console.log('password matches!')
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserialize', id);
  User.findOne({ email:id }, (err, user) => {
    done(err, user);
  });
});

app.post('/login', (req, res, next) => {
  console.log('login attempt');
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      console.log('no user', user, info);
      return res.redirect('/login.html');
      
    }
    
    req.login(user, function(error) {
        if (error) return next(error);
        console.log("Request Login supossedly successful.");
        return res.redirect('/');
    });
    //res.redirect('/');
    console.log(info);

  })(req, res, next);
});

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

app.get('/sms',(req, res) => {
  // sms("Eco", "791813568", "cześć soulcaptain", ()=>console.log('poszło'), ()=>console.log('nie poszło'));
  // schedule failure retry to background processsing
  res.send('ok')
});

app.get('/testx',(req, res) => {
  let data = {
      testField : "testValue"
  }
  res.send('OK');
  res.render("password", data, function(err, body){
    if (err) return console.error(err);
    mail('', 'subject', body, 'this is just a text');
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

app.get('/habits', (req, res)=>{
  res.render('habits')
})

app.post('/deck/:id/soulencja', (req, res)=>{

})


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





app.get('/profile',
  // require('connect-ensure-login').ensureLoggedIn(),
  isAuthenticated,
  function(req, res){
    console.log('/profile');
    res.send({ user: req.user });
  });

app.get('/login', passport.authenticate());

/**
 * Login Required middleware.
 */
function isAuthenticated(req, res, next){
  console.log('testing for login');
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login.html');
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

function testPassword(pass, hash, cb){
  bcrypt.compare(pass, hash, function(err, res) {
    if(res) {
      cb(null, 1);
      console.log('match');
    } else {
      cb(1);
      console.error('no match');
     // Passwords don't match
    } 
  });
}
