const crud = require('../crud/userAccessTokenCrud');


async function getDataByUserId(userId) {
    return crud.getDataByUserId(userId);
}

async function updateByUserId(userAccessTokenUpdate, t) {
    return crud.updateByUserId(userAccessTokenUpdate, t);
} 

async function insertToDb(userAccessToken, t) {
    return crud.insertToDb(userAccessToken, t);
}
async function removeAccessTokenByUserId(userId, t) {
    return crud.removeAccessTokenByUserId(userId, t);
}

module.exports = {
    getDataByUserId,
    updateByUserId,
    insertToDb,
    removeAccessTokenByUserId
}



