'use strict';

// Core modules
var exec = require('child_process').exec;

// External modules
var Bluebird = require('bluebird');

// Misc
var pexec = Bluebird.promisify(exec);

module.exports = {
  parseArgs: function (args) {
    if (args.bugfix || args.minor || args.major) {
      var version = this.getCurrentVersion().split('.');

      if (args.bugfix) {
        version[2]++;
      } else if (args.minor) {
        version[1]++;
        version[2] = 0;
      } else if (args.major) {
        version[0]++;
        version[1] = 0;
        version[2] = 0;
      }

      return { version: version.join('.') };
    } else {
      return { version: args._[0] };
    }
  },

  exec: function(command) {
    return pexec(command);
  },

  getCurrentVersion: function () {
    return require(process.cwd() + '/package.json').version;
  }
};
