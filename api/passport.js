const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const testPassword = require('./testPassword.js');

module.exports = function (mongoose, passport) {
	const User = mongoose.models.User;

	passport.use(new LocalStrategy({
		usernameField: 'email'
	}, (email, password, done) => {
		User.findOne({
			email: email.toLowerCase()
		}, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					msg: `Email ${email} not found.`
				});
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
				return done(null, false, {
					msg: 'Invalid email or password.'
				});
			});
		});
	}));

	passport.serializeUser((user, done) => {
		console.log('serialize user');
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		console.log('deserialize', id);
		User.findOne({
			_id: id
		}, (err, user) => {
			console.log('deserialize, returned:', err, user);
			done(err, user);
		});
	});
};