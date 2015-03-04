'use strict';

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
      .option('minor', {
        demand:   false,
        alias:    'm',
        describe: 'Bump the package to the next minor version.'
      })
      .option('major', {
        deman:    false,
        alias:    'M',
        describe: 'Bump the package to the next major version.'
      })
      .wrap(150)
      .argv;

    if ((argv._.length === 0) && !validOptionCount(argv)) {
      console.log(yargs.help());
      process.exit(1);
    }

    releaseTools.npm[functionName](support.misc.parseArgs(argv));
  }
};

function validOptionCount (argv) {
  return [argv.bugfix, argv.minor, argv.major].filter(function (arg) {
    return !!arg;
  }).length === 1;
}
