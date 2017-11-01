module.exports = function createStream(){
  var cs = {};
  
  cs.fileRead = function(filepath){
    const fs = require('fs');
    return fs.createReadStream(filepath);
  };

  cs.fileWrite = function(filepath){
    const fs = require('fs');
    return fs.createWriteStream(filepath);
  };

  cs.textRead = function(text){
    const Readable = require('stream').Readable;
    var stream = new Readable;
    stream.push(text);
    stream.push(null);
    return stream;
  };

  cs.textWrite = function(){
    const Writable = require('stream').Writable
    var stream = new Writable;
    stream._internaldata = "";
    stream._write = function(chunk, encoding, next) {
      stream._internaldata += chunk.toString();
      next();
    };
    stream.read = function(){
      
    }
    return stream;
  };

  return cs;
};