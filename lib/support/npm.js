'use strict';

// Local modules
var changelogHelper = require('./changelog');
var miscHelper = require('./misc');

module.exports = {
  updatePackage: function (args) {
    var version = args.version;
    var changes = changelogHelper.getChanges(version);
    var message = 'Bump to version: v{{version}}';

    if (changes) {
      message = message + '\n\n';

      ['Added', 'Changed', 'Removed'].forEach(function (type) {
        if (changes.hasOwnProperty(type)) {
          message = message + type + ':\n';

          changes[type].forEach(function (change) {
            message = message + '- ' + change + '\n';
          });
        }
      });
    }

    message = message.replace(/"/g, '\\"');

    var command = 'npm version {{version}} -m "' + message + '"';
    return miscHelper.exec(command.replace(/\{\{version\}\}/g, args.version));
  },

  publishPackage: function () {
    return miscHelper.exec('npm publish');
  }
};
