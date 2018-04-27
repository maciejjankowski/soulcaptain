module.exports = function (deps) {
	const app = deps.app;
	const passport = deps.passport;
	const logger = deps.logger;
	app.post('/login', (req, res, next) => {
		logger.info('SoulCaptain is seeing login attempt');
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				logger.info('no user', user, info);
				return res.redirect('/login.html');
			} else {
				req.login(user, function (error) {
					if (error) return next(error);
					// TODO redirect tam skąd user przyszedł a nie na pałe na "/"
					logger.info('Success! Redirecting to /');

					return res.redirect('/');
				});
				logger.info('info', info);
			}
		})(req, res, next);
	});
};
