'use strict';

// Core modules
var exec = require('child_process').exec;

// External modules
var Bluebird = require('bluebird');
var semver   = require('semver');

// Misc
var pexec = Bluebird.promisify(exec);

var helper = module.exports = {
  parseArgs: function (args) {
    if (args.patch || args.bugfix || args.minor || args.major || !semver.valid(args._[0])) {
      var version = helper.getCurrentVersion();
      var release;

      if (args.bugfix || args.patch) {
        release = 'patch';
      } else if (args.minor) {
        release = 'minor';
      } else if (args.major) {
        release = 'major';
      } else {
        release = args._[0];
      }

      return { version: semver.inc(version, release) };
    } else {
      return { version: args._[0] };
    }
  },

  validateVersion: function (args) {
    if (!semver.valid(args.version)) {
      var version = args.version || (args._ && args._[0]);
      throw new Error('Specified version is not valid: ' + version);
    } else if (semver.lte(args.version, helper.getCurrentVersion())) {
      throw new Error('Specified version is smaller than the current one: ' + args.version);
    }
  },

  exec: function (command) {
    return pexec(command);
  },

  getCurrentVersion: function () {
    return require(process.cwd() + '/package.json').version;
  }
};
