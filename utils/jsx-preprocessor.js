'use strict';

var ReactTools = require('react-tools');

module.exports = {
  process: function (src, path) {
    if (!path.match(/\.jsx$/))
      return src;

    return ReactTools.transform(src);
  }
};
