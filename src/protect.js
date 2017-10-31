module.exports = function Protect(){
  var protect = {};

  var private = {};

  private.common = {};
  private.common.createKeyPair = require('./common/createKeyPair');
  private.common.createPasswordFile = require('./common/createPasswordFile');
  private.common.deleteFiles = require('./common/deleteFiles');
  private.common.randomBytes = require('./common/randomBytes');

  var random = private.common.randomBytes(256);
  
  return protect;
};