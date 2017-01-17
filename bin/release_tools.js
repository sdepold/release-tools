'use strict';

// 3rd-party modules
var Bluebird = require('bluebird');

// Local modules
var releaseTools = require('../lib/index');
var support      = require('../lib/support');

module.exports = {
  init: function (functionName) {
    var yargs = require('yargs');

    var argv = yargs
      .usage('Usage: $0 [version] [--bugfix|--minor|--major]')
      .example('$0 1.2.3', 'Bump version to 1.2.3')
      .example('$0 --bugfix', 'Bump from 1.2.3 to 1.2.4')
      .example('$0 --minor', 'Bump from 1.2.3 to 1.3.0')
      .example('$0 --major', 'Bump from 1.2.3 to 2.0.0')
      .option('bugfix', {
        demand:   false,
        alias:    'b',
        describe: 'Bump the package to the next bugfix version.'
      })
      .option('patch', {
        demand:   false,
        alias:    'p',
        describe: 'Bump the package to the next patch version. This is an alias for --bugfix.'
      })
      .option('minor', {
        demand:   false,
        alias:    'm',
        describe: 'Bump the package to the next minor version.'
      })
      .option('major', {
        demand:   false,
        alias:    'M',
        describe: 'Bump the package to the next major version.'
      })
      .option('auto', {
        demand:   false,
        alias:    'a',
        describe: 'Automatically detect which version fragment needs bump.'
      })
      .option('auto-fallback', {
        demand: false,
        alias: 'f',
        describe: 'Defines version fragment which is bumped in case of failed auto detection.',
        choices: ['major', 'minor', 'patch']
      })
      .wrap(150)
      .argv;

    if ((argv._.length === 0) && !validOptionCount(argv)) {
      console.log(yargs.help());
      process.exit(1);
    }

    var result = Bluebird.resolve(argv);

    if (argv.auto) {
      result = result.then(autoDetectVersion(argv.autoFallback));
    }

    return result.then(function (args) {
      releaseTools.npm[functionName](support.misc.parseArgs(args));
    });
  }
};

function validOptionCount (argv) {
  return [argv.bugfix, argv.patch, argv.minor, argv.major, argv.auto].filter(function (arg) {
    return !!arg;
  }).length === 1;
}

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
