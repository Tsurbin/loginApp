const logoutService = require('../services/logoutService');
const loginDictionary = require('../../loginDictionary');

async function logout(req, res) {
    let userId = req.body.data;
    let responseState = await logoutService.logout(userId);
    res.status(200).json(responseState);
}



module.exports = {
    logout
}