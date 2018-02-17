const bcrypt = require('bcrypt');

module.exports = function(app, User){
	app.get('/profile',
		require('connect-ensure-login').ensureLoggedIn(),
		// isAuthenticated,
		function(req, res){
			console.log('/profile');
			res.send({ user: req.user });
		});

	app.get('/login', passport.authenticate());


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
}