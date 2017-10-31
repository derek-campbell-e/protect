module.exports = function(filename, callback){
    callback = callback || function(){};
    const fs = require('fs');

    if(Array.isArray(filename)){
        var errors = [];
        var loop = function(){
            var file = filename.shift();
            if(typeof file === "undefined"){
                callback(errors);
                return;
            }
            fs.unlink(file, function(err){
                if(err){
                    errors.push(err);
                }
                loop();
            });
        }
        loop();
        return;
    }

    fs.unlink(filename, callback);

};