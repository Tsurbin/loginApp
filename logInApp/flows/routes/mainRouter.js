const signupController = require('../controllers/signupController');
const loginController = require('../controllers/logInController');
const logoutController = require('../controllers/logoutController');
const refreshTokenController = require('../controllers/refreshTokenController');
const authentication = require('../../../authentication/authenticationMiddleware');


module.exports = function(app) {

    app.post('/signUp',signupController.signUp);
    app.post('/login', loginController.login);
    app.post('/logout', authentication.authenticationMiddleware , logoutController.logout);
    app.post('/refreshToken', refreshTokenController.getNewAccessTokenByRefreshToken);
    app.get('/logInVerification', authentication.authenticationMiddleware, loginController.logInVerification);

}