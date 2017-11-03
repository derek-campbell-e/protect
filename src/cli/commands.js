module.exports = function(Handlers){
  var commands = {};

  commands.listProfiles = {
    command: "ls",
    options: [
      ['-a, --active', 'active profiles']
    ],
    description: "list keychain profiles",
    action: Handlers.listProfiles
  };

  return commands;
};