const crud = require('../crud/usersCrud');

async function getUserDataByUserIdAndPassword(cryptoName, cryptoPassword) {
    return crud.getUserDataByUserIdAndPassword(cryptoName, cryptoPassword);
}


module.exports = {
    getUserDataByUserIdAndPassword
}