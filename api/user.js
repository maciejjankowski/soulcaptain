const bcrypt = require('bcrypt');
const testPassword = require('./testPassword');
const EmailsToUser = require('../email/email.js');
// const payloadTransformer = require('./payloadTransformer');

module.exports = function (deps) {
	const app = deps.app;
	const mongoose = deps.mongoose;
	const passport = deps.passport;
	const logger = deps.logger;
	app.get(
		'/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		// isAuthenticated,
		function (req, res) {
			logger.info('/profile');
			res.send({
				user: req.user
			});
		}
	);

	// TODO napisać lub użyć logout 
	app.get('/login', passport.authenticate());
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/postSignup', function postSignup(req, res) {
		let payloadFields = (req.body && req.body.payload) || req.body;
		logger.info('to jest konsol log dla payloadFields', payloadFields);

		let payloadApproved = {};

		let fieldsWeShouldHave = [
			'firstName',
			'email',
			'password',
			'repeatpassword'
		];
		Object.keys(payloadFields).forEach(function filterOutKeys(key) {
			if (fieldsWeShouldHave.indexOf(key) > -1) {
				payloadApproved[key] = payloadFields[key];
			}
		});
		logger.info(
			'to jest konsol log zestawiający',
			payloadFields.firstName,
			payloadApproved.firstName,
			payloadFields.email,
			payloadApproved.email,
			payloadFields.password,
			payloadApproved.password,
			payloadFields.repeatpassword,
			payloadApproved.repeatpassword
		);

		logger.info('to jest konsol log dla payloadApproved', payloadApproved);

		mongoose.models.User.findOne({
			loginId: payloadApproved.email
		}).then(
			user => {
				if (user) {
					logger.info(user);
					testPassword(user.password, err => {
						if (err) {
							return logger.info(
								'Wrong password (account for this email allready exist).'
							);
						} else {
							logger.info('Login successful', user);
							res.send('Login successful');
						}
					});
				} else {
					bcrypt.hash(payloadApproved.password, 10, function (err,
						pwhash) {
						let newUser = new mongoose.models.User({
							loginId: payloadApproved.email,
							loginType: 'email',
							email: payloadApproved.email,
							password: pwhash,
							personalInfo: [{
								firstName: payloadApproved.firstName,
								lastName: 'nie zbieramy'
							}]
						}).save(
							function sendWelcomeEmail(err, user) {
								logger.error({msg : 'user save failed', error : err});
								if (err) throw err;
								EmailsToUser.sendWelcome(res, user.email);
							}
						);
					});
				}
			}
		);

		res.writeHead(302, {
			Location: '/'
			//add other headers here...
		});
		res.end();
	}); // post user
};