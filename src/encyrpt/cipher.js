module.exports = function Cipher(password, inStream, outStream){
  const crypto = require('crypto');
  const cipher = crypto.createCipher('aes256', password);
  inStream.pipe(cipher).pipe(outStream);
};