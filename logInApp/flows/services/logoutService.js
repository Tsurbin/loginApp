const userAccessTokenService = require('../../services/userAccessTokenService');
const userRefreshTokenService = require('../../services/userRefreshTokenService');
const db = require('../../../dal/sequelize');
const loginDictionary = require('../../loginDictionary');

async function logout(userId) {
    
    try {
        let transaction = await db.sequelize.transaction();
        await userAccessTokenService.removeAccessTokenByUserId(userId, transaction);
        await userRefreshTokenService.removeRefreshTokenByUserId(userId, transaction);
        await transaction.commit();
        return loginDictionary.userLoggedOut
    }
    catch(err) {
        await transaction.rollback();
        return loginDictionary.userNotLoggedOutProperly;
    }
}

module.exports = {
    logout
}