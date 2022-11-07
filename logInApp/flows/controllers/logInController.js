const service = require('../services/logInService');
const crypto = require('../../crypto');
const loginDictionary = require('../../loginDictionary')



async function login(req, res) {
    try {
        response = await service.login(req.body.data);
        res. json(response);
    }
    catch(err) {
        console.log("Error logInController in [login]: " + err);
        res.json(response);

    }
}
async function logInVerification(req, res) {
    try {
        res.status(200).json(true);
    }
    catch(err) {
        res.status(401).json(false);
    }
}

module.exports = {
    login,
    logInVerification
}