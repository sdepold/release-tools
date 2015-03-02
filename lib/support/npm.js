'use strict';

// Local modules
var Support = require(__dirname);

module.exports = {
  updatePackage: function (args) {
    var command = 'npm version {{version}} -m "Bump to version: v{{version}}"';
    return Support.misc.exec(command.replace(/\{\{version\}\}/g, args.version));
  },

  publishPackage: function () {
    return Support.misc.exec('npm publish');
  }
};
