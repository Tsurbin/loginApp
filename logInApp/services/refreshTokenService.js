const authenticationService = require('../../authentication/authenticationService');
const loginDictionary = require('../loginDictionary');

async function getNewAccessTokenByRefreshToken(request){
    let refreshToken = authenticationService.getRefreshTokenFromRequest(request);
    let userId = authenticationService.getUserGuidFromHeaders(request);

    if (_.isEmpty(refreshToken) || _.isEmpty(userId) ) {
        return loginDictionary.userForbidden;
    }
    let isValid = await authenticationService.isRefreshTokenIsValid(refreshToken, userId);

    if (isValid) {
        let accessToken = authenticationService.updateAccessToken(userId);
        let data= {};
        data.accessToken = accessToken;
        let userId = await authenticationService.getUserDataByUserGuid(userId);
        data.user = getUserData(userData);
        return data;
    }
    return authenticationDictionary.userForbidden;
}

function getUserData(user){
    let userData = {};
    userData.role = user[0].role;
    userData.userId = user[0].userId;
    return userData;
}


module.exports = {
    getNewAccessTokenByRefreshToken
}