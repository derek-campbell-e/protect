var assert = require('assert');

describe("Protect", function(){
  var protect = require('../src/protect')();
  describe("#encrypt()", function(){
    it("should encrypt a file", function(){
      protect.encrypt.text("hello there");
    });
  });
});


describe('Common Utilities', function(){
  var randomBytes = require('../src/common/randomBytes');
  var deleteFiles = require('../src/common/deleteFiles');
  var createPasswordFile = require('../src/common/createPasswordFile');
  var passwordFiles = [];

  describe('#randomBytes()', function(){
    it('should not match another call of randomBytes', function(){
      assert.notEqual(randomBytes(5), randomBytes(5));
    });

    it('should be hexidecimal', function(){
      var rb = randomBytes(50).toLowerCase();
      var hexRegex = new RegExp(/^[0-9A-Fa-f]+$/);
      assert.ok(hexRegex.test(rb));
    });
  });

  describe("#deleteFiles()", function(){

    it("should delete a single file", function(done){
      const fs = require('fs');
      var existCount = 0;

      var doesExist = function(file, cb){
        const fs = require('fs');
        fs.access(file, fs.constants.F_OK, cb);
      };

      createPasswordFile('testtesttest', function(passwordFile){
        doesExist(passwordFile, function(error){
          if(!error){
            existCount ++;
          }
        });
        deleteFiles(passwordFile, function(){
          doesExist(passwordFile, function(error){
            if(error){
              existCount --;
            }
            done(existCount !== 0);
          });
        })
      });
    });

    

  });



  
});


