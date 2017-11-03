module.exports = function Keychain(){
  var keychain = {};

  const profile = require('./profile');

  keychain.profiles = [];

  var loadProfiles = function(callback){
    callback = callback || function(){};

    const path = require('path');
    const fs = require('fs');
    var user_data = path.join(__dirname, '../../', 'user_data');
    var folders = [];
    fs.readdir(user_data, function(err, list){
      var loop = function(){
        var folder = list.shift();
        if (typeof folder === "undefined") {
          callback(folders);
          return;
        }

        var folderPath = path.join(user_data, folder);
        fs.stat(folderPath, function(err, stat){
          if(stat && stat.isDirectory()) {
            folders.push(folderPath);
            loop();
          }
        });

      };
      loop();
    });
  };

  var createProfiles = function(folders){
    var profiles = [];
    for(var folder in folders) {
      folder = folders[folder];
      profiles.push(profile(folder));
    }
    keychain.profiles = profiles;
  };

  loadProfiles(createProfiles);

  return keychain;
};
