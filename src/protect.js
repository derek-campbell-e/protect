module.exports = function Protect(){
  var protect = {};

  protect.meta = require('../package.json');

  protect.keychain = require('./keychain')();

  var private = {};
  var cli = require('./cli')(protect);

  private.common = {};
  private.common.createKeyPair = require('./common/createKeyPair');
  private.common.getKeys = require('./common/getKeys');
  private.common.createPasswordFile = require('./common/createPasswordFile');
  private.common.deleteFiles = require('./common/deleteFiles');
  private.common.randomBytes = require('./common/randomBytes');
  private.common.createStream = require('./common/createStream')();

  protect.encrypt = require('../src/encyrpt')(protect, private);

  var random = private.common.randomBytes(256);

  return protect;
};
