module.exports = function Profile(folder){
  const path = require('path');
  var profile = {};

  profile.meta = {};
  profile.meta.name = path.basename(folder) || "DEFAULT";
  profile.meta.folderName = folder;
  profile.meta.isComplete = false; // if there is a public and private key should be true;

  var checkProfile = function(){
    const listFiles = require('../common/listFiles');
    listFiles(profile.meta.folderName, function(files){
      if(files){
        if(files.indexOf(path.join(profile.meta.folderName, 'private_key.pem')) != -1 && files.indexOf(path.join(profile.meta.folderName, 'public_key.pem')) != -1) {
          profile.meta.isComplete = true;
        }
      }
    });
  };

  checkProfile();

  return profile;
};
