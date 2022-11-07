const authenticationService = require('./authenticationService');
const jwt = require("jsonwebtoken");


async function authenticationMiddleware(req, res, next) {
    try {
        request = req;
        let accessToken = authenticationService.getAccessTokenFromRequest(req);
        if(!accessToken) {
            return res.status(401).json({ success: false, msg: "Token not found" });
        }
        let userId = authenticationService.getUserIdFromRequest(req);

        let isAccessTokenValid = await authenticationService.isAccessTokenIsValid(accessToken, userId);
        if(!isAccessTokenValid) {
            let isRefreshDataValid = await authenticationService.isRefreshTokenIsValid(userId);
            if(isRefreshDataValid) {
                try {
                   return authenticationService.updateAccessToken(userId).then( () => {
                    next();
                   });
                }
                catch(err) {
                    return res.status(401).json({ success: false, msg: "Token not found" });
                }
            }
        }
        if(isAccessTokenValid) {
            next();
        }
        next(401);
    }
    catch(err) {
        console.log(err);
        next(401);
    }
}

function authenticateAccessToken(req, res) {
    authenticationService.authenticateAccessToken(req, res);
}

module.exports = {
    authenticationMiddleware,
    authenticateAccessToken
}