'use strict';

// 3rd-party modules
var Bluebird = require('bluebird');

// Local modules
var releaseTools = require('../lib/index');
var support      = require('../lib/support');

module.exports = {
  init: function (functionName) {
    var argv = support.cli.init();
    var result = Bluebird.resolve(argv);

    if (argv.auto) {
      result = result.then(autoDetectVersion(argv.autoFallback));
    }

    return result.then(function (args) {
      releaseTools.npm[functionName](support.misc.parseArgs(args));
    });
  }
};

function autoDetectVersion (fallback) {
  return function () {
    return support.git.getCommitsSinceLastVersion().then(function (commits) {
      var result = {};
      var changeType = support.git.detectChangeType(commits, fallback);

      result[changeType] = true;

      return result;
    });
  }
}
