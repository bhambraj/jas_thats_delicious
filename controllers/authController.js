const passport = require('passport');

exports.login = passport.authenticate('local', {
	failureRedirect: '/login',
	failurFlash: 'Failed Login!',
	successRedirect: '/',
	successFlash: 'You successfully logged in'
});