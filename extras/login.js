passport.use(new GoogleStrategy({
    clientID: process.env.GOOGID,
    clientSecret: process.env.GOOGSECRET,
    callbackURL: `${process.env.ROOTURL}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FBID,
    clientSecret: process.env.FBSECRET,
    callbackURL: `${process.env.ROOTURL}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });