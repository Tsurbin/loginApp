const userCrud = require('../../crud/usersCrud');
const dictionary = require('../../loginDictionary');
const _ = require('lodash');
const guid = require('../../../authentication/guid');

async function signUp(data) {
    try {
        if(_.isEmpty(data.organization) || _.isEmpty(data.role) || _.isEmpty(data.password) || _.isEmpty(data.userName)){
            return dictionary.signupDictionary.MISSING_DATA;
        }
        let isUserExist = await userCrud.isUserNameExist(data.userName);
        if(isUserExist == true) {
            return dictionary.signupDictionary.USER_EXIST;
        }
        data.userId = guid.createUuid();
    
        await userCrud.create(data);
        return dictionary.signupDictionary.SUCCESS;
    }
    catch(err) {
        return dictionary.signupDictionary.FAILED;
    }
}


module.exports = {
    signUp
}