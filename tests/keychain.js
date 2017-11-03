var assert = require('assert');

describe("Keychain", function(){
  var keychain = require('../src/keychain')();
  describe("#loadProfiles()", function(){

    it("should auto load folders into profiles as an array", function(){
      console.log(keychain.profiles);
      assert(Array.isArray(keychain.profiles));
    });

  });

});
