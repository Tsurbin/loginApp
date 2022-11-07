const usersService = require('../../services/usersService');
const userRefreshTokenService = require('../../services/userRefreshTokenService');
const userAccessTokenService = require('../../services/userAccessTokenService');
const dictionary = require('../../loginDictionary');
const crypto = require('../../crypto')
const _ = require('lodash');
const guid = require('../../../authentication/guid');
const authentication = require('../../../authentication/authenticationService');
const moment = require('moment');
const db = require('../../../dal/sequelize');
const loginDictionary = require('../../loginDictionary');


async function login(data) {
    try {
        let responseData = {};
        if(_.isEmpty(data.password) || _.isEmpty(data.userName)){
            return responseData.state = dictionary.loginDictionary.MISSING_DATA;
        }
        let cryptoName = crypto.encrypt(data.userName);
        let cryptoPassword = crypto.encrypt(data.password);

        let userData = await usersService.getUserDataByUserIdAndPassword(cryptoName, cryptoPassword);
        if(!_.isEmpty(userData)) {
            try {
                let transaction = await db.sequelize.transaction();
                let userAccessToken = await createOrUpdateAccessToken(userData[0].dataValues.userId, transaction);
                let userRefreshToken = await createOrUpdateRefreshToken(userData[0].dataValues.userId, transaction);
                await transaction.commit();
                responseData.data = mapUserData(userAccessToken, userRefreshToken);
                responseData.state = dictionary.loginDictionary.SUCCESS;
                return responseData;
            }
            catch(err) {
                await transaction.rollback();
                throw err;
            }
        }
        responseData.state = dictionary.loginDictionary.USER_AND_PASSWORD_FAILURE;
        return responseData
    }
    catch(err) {
        let responseData = {}
        responseData.state = dictionary.loginDictionary.FAILED;
        return responseData;
    }
}
async function createOrUpdateAccessToken(userId, t) {  
    try {
        
        let userAccessTokenFromDb = await userAccessTokenService.getDataByUserId(userId);
        let userAccessTokenData = {};
        userAccessTokenData.userId = userId;
        userAccessTokenData.accessToken = guid.generateToken();
        userAccessTokenData.createDate = new Date();
        userAccessTokenData.expireDate = moment(userAccessTokenData.createDate).add(authentication.getAccessTokenExpiredHours(), 'hours');

        if(!_.isEmpty(userAccessTokenFromDb)) {
            await userAccessTokenService.updateByUserId(userAccessTokenData, t);
            return userAccessTokenData;
        }
        if(_.isEmpty(userAccessTokenFromDb)) {
            await userAccessTokenService.insertToDb(userAccessTokenData, t);
            return userAccessTokenData;
        }
    }
    catch(err) {
        throw err;
    }
}
async function createOrUpdateRefreshToken(userId, t) {
    try {
        let userRefreshTokenFromDb = await userRefreshTokenService.getRefreshTokenByUserId(userId);
        let userRefreshToken = {};
        userRefreshToken.userId = userId
        userRefreshToken.refreshToken = guid.generateToken();
        userRefreshToken.createDate = new Date();
        userRefreshToken.expireDate = moment(userRefreshToken.createDate).add(authentication.getRefreshTokenExpiredHours(), 'hours');
        
        if(userRefreshTokenFromDb == loginDictionary.refreshTokenDenied) {
            await userRefreshTokenService.insertRefreshToken(userRefreshToken, t);
            return userRefreshToken;
        }
        if(!_.isEmpty(userRefreshTokenFromDb)) {
            await userRefreshTokenService.updateByUserId(userRefreshToken, t);
            return userRefreshToken;
        }
    }
    catch(err) {
        throw err;
    }
}
function mapUserData(userAccessToken, userRefreshToken) {
    let userData = {};
    userData.userId = userAccessToken.userId;
    userData.accessToken = userAccessToken.accessToken;
    userData.refreshToken = userRefreshToken.refreshToken;
    return userData;

}
module.exports = {
    login
}