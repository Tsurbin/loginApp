const _ =  require('lodash');
const loginDictionary = require('../logInApp/loginDictionary');
const userRefreshTokenService = require('../logInApp/services/userRefreshTokenService');
const guid = require('../authentication/guid');
const userAccessTokenService = require('../logInApp/services/userAccessTokenService');
const accessTokenExpireHours = 1;
const refreshTokenExpireHours = 24;

function getAccessTokenExpiredHours() {
    return accessTokenExpireHours
}
function getRefreshTokenExpiredHours() {
    return refreshTokenExpireHours
}

function getAccessTokenFromRequest(request){
    if(!_.isEmpty(request.headers.authorization)){
        return request.headers.authorization;
    }
    return null;
}
function getUserIdFromRequest(request){
    if (!_.isEmpty(request.headers.userid)){
        return request.headers.userid;
    }
    return null;
}
function getRoleFromRequest(request) {
    if (!_.isEmpty(request.headers.role)) {
        return request.headers.role;
    }
    return null;
}
async function isUserGuidExistInRefreshTokenTable(userId){
    try {
        let refreshToken = await userRefreshTokenService.getRefreshTokenByUserGuid(userId);
        if(_.isEmpty(refreshToken)){
            return false;
        }
        return true;
    }
    catch(error) {
        throw ("Error authenticationService in [isUserGuidExistInRefreshTokenTable]: " + error);
    };
};
function getRefreshTokenFromRequest(request){
    if(!_.isEmpty(request.body.data)){
         return request.body.data;
    }
    return null;
}
function getUserGuidFromHeaders(req){
    if(!_.isEmpty(req.headers.userguid)){
        return req.headers.userguid;
   }
   return null;
}
async function isAccessTokenIsValid(accessToken,userId) {
    let accessTokenData = await userAccessTokenService.getDataByUserId(userId);
    if(_.isEmpty(accessTokenData)) {
        return false;
    }
    let currentDate = new Date();
    if(accessTokenData[0].dataValues.accessToken == accessToken && accessTokenData[0].dataValues.expireDate > currentDate) {
        return true;
    }
    return false;
}
async function isRefreshTokenIsValid(userId){
    let refreshTokenInfo = await userRefreshTokenService.getRefreshTokenByUserId(userId);
    
    if(refreshTokenInfo == loginDictionary.refreshTokenDenied){
        return false;
    }
    if (refreshTokenInfo[0].userId != userId) {
        return false;
    }
    if(refreshTokenInfo[0].dataValues.expireDate < new Date()) {
        return false;
    }
    return true;

}
async function updateAccessToken(userId){
    try{
        let accessTokenInfo = getNewAccessTokenForUser(userId);
        await userAccessTokenService.updateByUserId(accessTokenInfo);
        return accessTokenData.accessToken;
    }
    catch(error){
        throw (error);
     }
}

function getNewAccessTokenForUser(userId) {
    let accessTokenInfo = {};
    accessTokenInfo.userId = userId
    accessTokenInfo.accessToken = guid.generateToken();
    accessTokenInfo.createDate = new Date();
    accessTokenInfo.expireDate = moment(accessTokenInfo.createDate).add(getAccessTokenExpiredHours(), 'hours');
    return accessTokenInfo
}


module.exports = {
    getAccessTokenFromRequest,
    getUserIdFromRequest,
    getRoleFromRequest,
    isUserGuidExistInRefreshTokenTable,
    getRefreshTokenFromRequest,
    getUserGuidFromHeaders,
    isRefreshTokenIsValid,
    updateAccessToken,
    getAccessTokenExpiredHours,
    getRefreshTokenExpiredHours,
    isAccessTokenIsValid
}