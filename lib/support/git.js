'use strict';

// Local modules
var helper = require('./misc');

module.exports = {
  push: function () {
    return helper.exec('git push');
  },

  pushTags: function () {
    return helper.exec('git push --tags');
  }
};
