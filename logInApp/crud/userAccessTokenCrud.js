const db = require('../../dal/sequelize');
const _db = db.user_access_token;


async function isAccessTokenValidByUserName(userName) {
    return await _db.findAll({
            where: {
                userName: userName
            },
            attributes: ['accessToken'],
    }).then( (res) => {
        if(!_.isEmpty(res)) {
            return true;
        }
        return false;
    });   
}
async function getDataByUserId(userId) {
    try {
        return await _db.findAll({
            where: {
                userId: userId
            }
        });
    }
    catch(err) {
        return [];
    }
}
async function updateByUserId(data, t) {
    try {
        return await _db.update(
            {
              accessToken: data.accessToken,
              createDate: data.createDate,
              expireDate: data.expireDate
            },
            {
              where: { userId: data.userId },
            }
          , {transaction: t});
    }
    catch(err) {
        throw err;
    }
}
async function insertToDb(userAccessToken, t) {
    try {
        return await _db.create({
            userId: userAccessToken.userId,
            accessToken: userAccessToken.accessToken,
            createDate: userAccessToken.createDate,
            expireDate: userAccessToken.expireDate
        }, {transaction: t})
    }
    catch(err) {
        return [];
    }
}
async function removeAccessTokenByUserId(userId, t) {
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
    isAccessTokenValidByUserName,
    getDataByUserId,
    updateByUserId,
    insertToDb,
    removeAccessTokenByUserId
}
