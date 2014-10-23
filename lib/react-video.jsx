var React = require('react');
var classSet = require('../utils/classSet');
var ajax = require('../utils/ajax');
var PlayButton = require('./components/play-button');
var Spinner = require('./components/spinner');

var Youtube = require('./video-youtube');
var Vimeo = require('./video-vimeo');

module.exports = {
  Youtube: Youtube,
  Vimeo: Vimeo
};