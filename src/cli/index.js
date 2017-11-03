module.exports = function CLI(Protect){
  var cli = {};
  
  var vorpal = require('vorpal')();
  var handlers = require('./handlers')(Protect);
  var commands = require('./commands')(handlers);
  

  var setupCLI = function(){
    var delimiter = Protect.meta.name + "-" + Protect.meta.version;
    vorpal.delimiter(delimiter).show();
    for(var command in commands){
      var index = command;
      command = commands[index];
      bindCommand(command);
    }
  };

  var bindCommand = function(command){
    var vorpalSession = vorpal.command(command.command);
  
    for(var key in command) {
      switch(key){
        case 'command':
        break;

        case 'description':
        case 'action':
          vorpalSession[key].apply(vorpalSession, [command[key]]);
        break;

        case 'options':
          for(var option in command.options){
            var optionSegment = command.options[option];
            vorpalSession.option.apply(vorpalSession, optionSegment);
          }
        break;
      }
    }
  };

  setupCLI();

  return cli;
};