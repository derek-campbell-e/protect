module.exports = function Encrypt(Protect, PrivateSector){
  const spawn = require('child_process').spawn;
  var encrypt = {};

  var delegates = require('./delegates')(PrivateSector);
  var cipher = require('./cipher');

  encrypt.text = function(text, cb){
    delegates.ableToEncrypt(function(ableToEncrypt, privateKey, publicKey){
      if(!ableToEncrypt){
        return cb(false, "need private/public keypair");
      }
      var randomPassword = PrivateSector.common.randomBytes(128);
      PrivateSector.common.createPasswordFile(randomPassword, function(passwordFileUnEnc){
        if(!passwordFileUnEnc){
          return cb(false, "unable to create passfile");
        }

        var keyEncryptionSpawn = spawn(
          'openssl', 
          ['rsautl', '-encrypt', '-inkey', publicKey, '-pubin', '-in', passwordFileUnEnc, '-out', passwordFileUnEnc+".enc"]
        );

        keyEncryptionSpawn.stderr.pipe(process.stderr);

       

        keyEncryptionSpawn.on('close', function(code){
          switch(code){
            case 0:
              var encryptedText = PrivateSector.common.createStream.textWrite();
              cipher(randomPassword, PrivateSector.common.createStream.textRead(text), encryptedText);
              console.log("AAA");
              encryptedText.on('close', function(){
                console.log("FINISHED");
                console.log(encryptedText.read());
              })
            break;
          }
        });
      });

      
    });
  };

  return encrypt;
};