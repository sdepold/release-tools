'use strict';

var exec = require('../../lib/support/misc').exec;
var testDir = "/tmp/release-tools-test";

var helper = module.exports = {
  bumpAndGetVersion: function (args) {
    return helper.prepare().then(function () {
      return helper.callBump(args);
    }).then(function () {
      return helper.readVersion();
    });
  },

  prepare: function () {
    return exec('rm -rf ' + testDir).then(function () {
      return exec('mkdir ' + testDir);
    }).then(function () {
      return exec('echo "{\\"version\\":\\"0.0.0\\"}" > ' + testDir + '/package.json');
    }).then(function () {
      return exec('git init .', { cwd: testDir });
    });
  },

  callBump: function (args) {
    console.log(process.cwd() + '/bin/npm_bump.js --skip-push ' + (args || ''))
    return exec(process.cwd() + '/bin/npm_bump.js --skip-push ' + (args || ''), { cwd: testDir });
  },

  readVersion: function () {
    delete require.cache[require.resolve(testDir + '/package.json')];
    return require(testDir + '/package.json').version;
  }
};
