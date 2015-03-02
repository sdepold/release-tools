#!/usr/bin/env node

// 3rd party modules
var yargs        = require('yargs');

// Local modules
var releaseTools = require('../lib/index');
var Support      = require('../lib/support');

var argv = yargs
  .usage('Usage: $0 version')
  .example('$0 1.2.3', 'Bump version to 1.2.3')
  .demand(1)
  .argv;

releaseTools.npm.release(Support.misc.parseArgs(argv));
