var React = require('react');
var ajax = require('../utils/ajax');
var VideoMixin = require('./video-mixin');

module.exports = React.createClass({
  mixins: [VideoMixin],
  getDefaultProps() {
    return {from: "vimeo"}
  },
  getIframeUrl() {
    return `//player.vimeo.com/video/${this.props.id}?autoplay=1`
  },
  fetch() {
    var id = this.props.id;
    var url = `http://vimeo.com/api/v2/video/${id}.json`;

    ajax.get(url, function(err, res) {
      this.setState({
        thumb: res[0].thumbnail_large,
        imageLoaded: true
      });
    }.bind(this));
  }
});
