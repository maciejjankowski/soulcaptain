const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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

module.exports = function (mongoose, passport) {
	const User = mongoose.models['User'];

	passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
		User.findOne({email: email.toLowerCase()}, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {msg: `Email ${email} not found.`});
			}
			console.log('passport login', password, user.password);
			testPassword(password, user.password, (err, isMatch) => {
				if (err) {
					return done(err);
				}
				if (isMatch) {
					console.log('password matches!');
					return done(null, user);
				}
				return done(null, false, {msg: 'Invalid email or password.'});
			});
		});
	}));

	passport.serializeUser((user, done) => {
		console.log('serialize user');
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		console.log('deserialize', id);
		User.findOne({email: id}, (err, user) => {
			done(err, user);
		});
	});
}