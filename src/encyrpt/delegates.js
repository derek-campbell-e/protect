module.exports = function Delegates(PrivateSector){
  var delegates = {};

  var ps = PrivateSector;

  delegates.ableToEncrypt = function(callback){
    ps.common.getKeys(function(privateKeyFP, publicKeyFP){
      if(!privateKeyFP || !publicKeyFP){
        return callback(false, false, false);
      }
      return callback(true, privateKeyFP, publicKeyFP);
    });
  };

  return delegates;
};