module.exports = function GetKeys(cb){
  const fs = require('fs');
  const path = require('path');

  var user_data = path.join(__dirname, '../', '../', 'user_data');
  var privateKeyFP = path.join(user_data, 'private_key.pem');
  var publicKeyFP = path.join(user_data, 'public_key.pem');

  cb(privateKeyFP, publicKeyFP);

  /*
  fs.readFile(privateKeyFP, {encoding: 'utf8' }, function(err, privateKeyFile){
    if(err){
      return cb(null, null);
    }
    fs.readFile(publicKeyFP, {encoding: 'utf8'}, function(err, publicKeyFile){
      if(err){
        return cb(null, null);
      }
      cb(privateKeyFile, publicKeyFile);
    });
  });
  */

};