module.exports = function createKeyPair(keychainProfile, password, callback){

  callback = callback || function(){};

  /**
   * generate private key:
   * openssl genrsa -des3 -out private.pem 2048
   *
   * generate public key:
   * openssl rsa -in private.pem -outform PEM -pubout -out public.pem
   */

  const spawn = require('child_process').spawn;
  const fs = require('fs');
  const path = require('path');
  const createPasswordFile = require('./createPasswordFile');
  const deleteFiles = require('./deleteFiles');

  var user_data = path.join(__dirname, '../', '../', 'user_data');
  user_data = path.join(user_data, keychainProfile.meta.folderName);
  var privateKeyFP = path.join(user_data, 'private_key.pem');
  var publicKeyFP = path.join(user_data, 'public_key.pem');

  var createPublicKey = function(passwordFile) {
    var pkspawn = spawn('openssl', ['rsa', '-in', privateKeyFP, '-passin', 'file:'+passwordFile, '-pubout', '-out', publicKeyFP]);
    pkspawn.stdout.on('data', function(data){
      //console.log("stdout:\n", data.toString().trim());
    });

    pkspawn.stderr.on('data', function(data){
      //console.log("stderr:\n", data.toString().trim());
    });

    pkspawn.stdin.on('data', function(data){
      //console.log("stdin:\n", data.toString().trim());
    });

    pkspawn.on('close', function(code){
      //console.log("exit code:",code);
      switch(code){
          // all good
          case 0:
              callback(privateKeyFP, publicKeyFP);
              deleteFiles(passwordFile);
          break;
      }
    });
  };

  var createPrivateKey = function(passwordFile){
    if(!passwordFile) {
        return false;
    }

    var pkspawn = spawn('openssl', ['genrsa', '-aes256', '-out', privateKeyFP, '-passout', 'file:'+passwordFile, '3072']);

    pkspawn.stdout.on('data', function(data){
      //console.log("stdout:\n", data.toString().trim());
    });

    pkspawn.stderr.on('data', function(data){
      //console.log("stderr:\n", data.toString().trim());
    });

    pkspawn.stdin.on('data', function(data){
      //console.log("stdin:\n", data.toString().trim());
    });

    pkspawn.on('message', function(message){
      //console.log("message:", message);
    });

    pkspawn.on('close', function(code){
      //console.log("exit code:",code);
      switch(code){
          // all good
          case 0:
              createPublicKey(passwordFile);
          break;
      }
    });
  };

  createPasswordFile(password, createPrivateKey);



};
