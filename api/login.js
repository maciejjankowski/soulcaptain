module.exports = function (app, passport) {
	app.post('/login', (req, res, next) => {
		console.log('SoulCaptain is seeing login attempt');
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				console.log('no user', user, info);
				return res.redirect('/login.html');
			} else {
				req.login(user, function (error) {
					if (error) return next(error);
					// TODO redirect tam skąd user przyszedł a nie na pałe na "/"
					console.log('Success! Redirecting to /');
					
					return res.redirect('/');
				});
				console.log('info', info);
			}
		})(req, res, next);
	});
};
