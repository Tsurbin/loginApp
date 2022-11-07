

const { uuid } = require('uuidv4');
const generator = require('generate-password');
const randToken = require('rand-token');

function createUuid(){
    return uuid();
}
function generatePassword(){
    return generator.generate({length: 10, numbers: true, uppercase: true})
}
function generateToken() {
    return randToken.generate(16);
}

module.exports = {
    createUuid,
    generatePassword,
    generateToken
};