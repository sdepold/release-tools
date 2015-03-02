'use strict';

// External modules
var Bluebird = require('bluebird');

// Local modules
var Support = require('./support');

module.exports = {
  bump: function (args) {
    return Bluebird
      .resolve(args)
      .tap(Support.changelog.update)
      .tap(Support.npm.updatePackage)
      .tap(Support.git.push)
      .tap(Support.git.pushTags);
  },

  release: function (args) {
    return this
      .bump(args)
      .tap(Support.npm.publishPackage);
  }
};
