module.exports = function RandomBytes(number){
    var crypto = require('crypto');
    return crypto.randomBytes(number).toString('hex');
};