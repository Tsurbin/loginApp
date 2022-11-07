const crud = require('../crud/userRefreshTokenCrud');
const loginDictionary = require('../loginDictionary');
const _ = require('lodash');

async function createRefreshToken(userRefreshTokenData) {
    return await crud.createRefreshToken(userRefreshTokenData)
}

async function getRefreshTokenByUserId(userId) {
    let refreshTokenData = await crud.getRefreshTokenByUserId(userId);
    if(_.isEmpty(refreshTokenData)){
        return loginDictionary.refreshTokenDenied;
     }
     return refreshTokenData;
}
async function updateByUserId(userRefreshTokenUpdate, t) {
    return await crud.updateByUserId(userRefreshTokenUpdate, t);
}
async function insertRefreshToken(userRefreshToken, t) {
    return await crud.insertRefreshToken(userRefreshToken, t);
}
async function getRefreshTokenDataByRefreshToken(refreshToken) {
    let refreshTokenData = await crud.getAllDataByRefreshToken(refreshToken)
    if(_.isEmpty(refreshTokenData)){
        return loginDictionary.refreshTokenDenied;
     }
     return refreshTokenData;
}
async function removeRefreshTokenByUserId(userId, t) {
    return crud.removeRefreshTokenByUserId(userId, t);
}

module.exports = {
    createRefreshToken,
    getRefreshTokenByUserId,
    updateByUserId,
    getRefreshTokenDataByRefreshToken,
    insertRefreshToken,
    removeRefreshTokenByUserId
}
