module.exports = function(Protect){
  var handlers = {};

  handlers.listProfiles = function(args, cb){
    var profiles = Protect.keychain.profiles;
    if(profiles.length === 0) {
      this.log("No profiles");
      cb(null);
      return profiles;
    }

    for(var profile in profiles) {
      profile = profiles[profile];
      var name = profile.meta.name;
      var folder = profile.meta.folderName;
      console.log("Name:\t", name);
      console.log("Folder:\t", folder);
      console.log("--------------");
    }

    cb(profiles);
  };

  return handlers;
};