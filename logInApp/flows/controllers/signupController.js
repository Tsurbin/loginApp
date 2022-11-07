const signupService = require('../services/signupService');
const crypto = require('../../crypto');



async function signUp(req, res) {
    try {
        let data = {};
        data.userName = crypto.encrypt(req.body.data.userName);
        data.password = crypto.encrypt(req.body.data.password);
        data.role = req.body.data.role;
        data.organization = req.body.data.organization;
        data.country = req.body.data.country.label;
        let response = await signupService.signUp(data);
        res.json(response);
    }
    catch(err) {
        console.log("Error logInController in [signUp]: " + err);
    }
}

module.exports = {
    signUp
}