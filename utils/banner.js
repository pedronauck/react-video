'use strict';

module.exports = require('lodash').template([
  '/*',
  ' * React Video - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' * @author <%= pkg.author.name %> (<%= pkg.author.url %>)',
  '*/\n',
].join('\n'), {
  pkg: require('../package.json')
});
