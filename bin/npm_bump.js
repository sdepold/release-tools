#!/usr/bin/env node

'use strict';

// 3rd party modules
var yargs        = require('yargs');

// Local modules
var helper       = require('../lib/helper');
var releaseTools = require('../lib/index');

var argv = yargs
  .usage('Usage: $0 version')
  .example('$0 1.2.3', 'Bump version to 1.2.3')
  .demand(1)
  .argv;

releaseTools.npm.bump(helper.parseArgs(argv));
