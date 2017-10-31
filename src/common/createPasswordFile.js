module.exports = function createPasswordFile(password, callback){
    const fs = require('fs');
    const path = require('path');

    var hidden_files = path.join(__dirname, '../../', '.bin');
    var randomFileName = require('crypto').randomBytes(5).toString('hex');
    var passfile = path.join(hidden_files, randomFileName+'.txt');

    fs.writeFile(passfile, password, {encoding: 'utf8', mode: 0o600}, function(err){
        if(err){
            callback(false);
            return console.log(err);
        }
        callback(passfile);
    });
};