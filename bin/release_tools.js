'use strict';

module.exports = {
  init: function (functionName) {
    var yargs        = require('yargs');
    var releaseTools = require('../lib/index');
    var support      = require('../lib/support');

    var argv = yargs
      .usage('Usage: $0 version')
      .example('$0 1.2.3', 'Bump version to 1.2.3')
      .demand(1)
      .argv;

    releaseTools.npm[functionName](support.misc.parseArgs(argv));
  }
};
