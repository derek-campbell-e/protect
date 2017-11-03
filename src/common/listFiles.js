module.exports = function listFiles(folder, callback){
  const fs = require('fs');
  const path = require('path');

  fs.readdir(folder, function(err, list){

    if(err) {
      return callback(null);
    }

    var files = [];

    var loop = function(){
      var item = list.shift();
      if (typeof item === "undefined") {
        return callback(files);
      }

      fs.stat(path.join(folder,item), function(err, stat){
        if(err) {
          return loop();
        }
        if(stat && stat.isFile()) {
          files.push(path.join(folder, item));
          return loop();
        }
      });

    };

    loop();

  });
};
