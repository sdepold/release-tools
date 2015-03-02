'use strict';

// Core modules
var exec = require('child_process').exec;

// External modules
var Bluebird = require('bluebird');

// Misc
var pexec = Bluebird.promisify(exec);

module.exports = {
  parseArgs: function (args) {
    return {
      version: args._[0]
    };
  },

  exec: function(command) {
    return pexec(command);
  }
};
