const crud = require('../crud/userAccessTokenCrud');
const db = require('../../dal/sequelize');
const _db = db.user_refresh_token;



async function insertRefreshToken(userRefreshToken, t) {
    try {
        return await _db.create({
            userId: userRefreshToken.userId,
            refreshToken: userRefreshToken.refreshToken,
            createDate: userRefreshToken.createDate,
            expireDate: userRefreshToken.expireDate
        }, {transaction: t})
    }
    catch(err) {
        throw err;
    }
}
async function getRefreshTokenByUserId(userId){
    return await _db.findAll({
        attributes:['refreshToken'],
        where:{
            userId:userId
        }
    })
}
async function updateByUserId(userRefreshTokenUpdate, t) {
    try {
        await _db.update(
            { 
                refreshToken: userRefreshTokenUpdate.refreshToken,
                createDate: userRefreshTokenUpdate.createDate,
                expireDate: userRefreshTokenUpdate.expireDate
             },
            { where: { userId: userRefreshTokenUpdate.userId } }
        , {transaction: t});
    }
    catch(err) {
        throw err;
    }
}
async function getAllDataByRefreshToken(refreshToken){
    return await _db.findAll({
        where:{
            refreshToken: refreshToken
        }
    });
};
async function removeRefreshTokenByUserId(userId, t) {
    try {
        return await _db.destroy({
            where: { userId: userId }
        }, {transaction: t})
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    getRefreshTokenByUserId,
    updateByUserId,
    getAllDataByRefreshToken,
    insertRefreshToken,
    removeRefreshTokenByUserId
}