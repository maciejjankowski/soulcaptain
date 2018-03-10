const bcrypt = require('bcrypt');
const testPassword = require('./testPassword');
const payloadTransformer = require('./payloadTransformer');

module.exports = function (app, mongoose, passport) {
    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        // isAuthenticated,
        function (req, res) {
            console.log('/profile');
            res.send({ user: req.user });
        });

    app.get('/login', passport.authenticate());


    app.post('/postSignup', function postSignup(req, res) {

        let payloadFields = (req.body && req.body.payload) || req.body;
        console.log('to jest konsol log dla payloadFields', payloadFields)

        let payloadApproved = {};

        let fieldsWeShouldHave = ['firstName', 'email', 'password', 'repeatpassword'];
        Object.keys(payloadFields).forEach(function filterOutKeys(key) {
            if (fieldsWeShouldHave.indexOf(key) > -1) {
                payloadApproved[key] = payloadFields[key];
            }

        });
        console.log('to jest konsol log zestawiający', payloadFields.firstName, payloadApproved.firstName, payloadFields.email, payloadApproved.email, payloadFields.password, payloadApproved.password, payloadFields.repeatpassword, payloadApproved.repeatpassword)


        console.log('to jest konsol log dla payloadApproved', payloadApproved)

        mongoose.models['User'].findOne({ loginId: payloadApproved.email }).then((user) => {
            if (user) {
                console.log(user)
                testPassword(user.password, (err) => {
                    if (err) { return console.log('Wrong password (account for this email allready exist).'); }
                    else {
                        console.log('Login successful', user);
                        res.send('Login successful')
                    }
                });
            } else {
                bcrypt.hash(payloadApproved.password, 10, function (err, pwhash) {
                    let newUser = new mongoose.models['User']({
                        loginId: payloadApproved.email,
                        loginType: "email",
                        email: payloadApproved.email,
                        password: pwhash
                    }).save();
                });
            };
        });

        res.writeHead(302, {
            'Location': '/'
            //add other headers here...
        });
        res.end();

    }) // post user
}