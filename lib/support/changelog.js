'use strict';

// Core modules
var fs = require('fs');
var path = require('path');

// 3rd-party modules
var Bluebird   = require('bluebird');
var dateFormat = require('dateformat');

// Local modules
var helper = require('./misc');

var changelog = module.exports = {
  update: function (args) {
    return Bluebird.resolve().then(function () {
      if (changelog.exists() && changelog.needsUpdate()) {
        changelog.setVersion(args.version);
        return changelog.commitVersion(args.version);
      }
    });
  },

  changelogPath: function () {
    return path.resolve(process.env.CHANGELOG_HOME || process.cwd(), 'CHANGELOG.md');
  },

  exists: function () {
    return fs.existsSync(this.changelogPath());
  },

  needsUpdate: function () {
    return this.read().indexOf('## Upcoming') > -1;
  },

  setVersion: function (version) {
    var currentContent = this.read();
    var date           = date;
    var formattedDate  = dateFormat(date, 'yyyy-mm-dd');
    var needle         = '## Upcoming';
    var replacement    = '## v' + version + ' - ' + formattedDate;

    this.write(currentContent.replace(needle, replacement));
  },

  read: function () {
    return fs.readFileSync(this.changelogPath()).toString();
  },

  write: function (newContent) {
    fs.writeFileSync(this.changelogPath(), newContent);
  },

  commitVersion: function (version) {
    return helper.exec('git add CHANGELOG.md').then(function () {
      return helper.exec('git commit -m "Add changes in version: v' + version + '"');
    });
  }
};
