const bcrypt = require('bcrypt');

module.exports = function testPassword(pass, hash, cb) {
	bcrypt.compare(pass, hash, function (err, res) {
		if (res) {
			cb(null, 1);
			console.log('match');
		} else {
			cb(1);
			console.error('no match');
			// Passwords don't match
		}
	});
};