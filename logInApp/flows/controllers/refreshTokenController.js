const refreshTokenService = require('../../services/refreshTokenService');
const loginDictionary = require('../../loginDictionary');

function getNewAccessTokenByRefreshToken(req,res) {
    try {
        let result = refreshTokenService.getNewAccessTokenByRefreshToken(req);
        if (result == loginDictionary.userForbidden){
            res.status(401).json();  
        }
        else{
            res.status(200).json(result);
        }  
    }
    catch(err) {
        res.status(401).json();  
    };
}


module.exports = {
    getNewAccessTokenByRefreshToken
}