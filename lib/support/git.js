'use strict';

// Local modules
var helper = require(__dirname);

module.exports = {
  push: function () {
    return helper.misc.exec('git push');
  },

  pushTags: function () {
    return helper.misc.exec('git push --tags');
  }
};
