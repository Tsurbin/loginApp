const db = require('../../dal/sequelize');
const _db = db.users;
const _ = require('lodash');


async function createBulk(data) {
    try {
        let res = await _db.bulkCreate(
            data
        );
        return res;
    } 
    catch (error) {
        console.log('usersCrud.js: createBulk(data,t) error: ' + error);
        throw error;
    }
}
async function create(data) {
    try {
        await _db.create({
            userId: data.userId,
            organization: data.organization,
            role: data.role,
            password: data.password,
            userName: data.userName,
            token: data.token
        });
    }
    catch(err) {
        console.log("Error usersCrud in [create]: " + err );
        throw err;
    }
}
async function isUserNameExist (userName) {
    return await _db.count({ where: { userName: userName } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
}
async function isUserNameAndPasswordValid(userName, password) {
    try {
        return await _db.count({ where: { userName: userName, password: password } })
      .then(count => {
        if (count != 0) {
          return true;
        }
        return false;
    });
    }
    catch(err) {
        console.log("Error usersCrud in [isUserNameAndPasswordExist]: " + err );
        return false;
    }
}
async function getUserDataByUserIdAndPassword(userName, password) {
    try {
        return await _db.findAll({
            where: {
                userName: userName,
                password: password
            }
        })
    }
    catch(err) {
        return [];
    }
}
async function isTokenAccessExistByUserName(userName) {
    return await _db.findAll({
            where: {
                userName: userName
            },
            attributes: ['tokenAccess'],
    }).then( (res) => {
        if(!_.isEmpty(res)) {
            return true;
        }
        return false;
    });
}


module.exports = {
    createBulk,
    create,
    isUserNameExist,
    isUserNameAndPasswordValid,
    isTokenAccessExistByUserName,
    getUserDataByUserIdAndPassword
}