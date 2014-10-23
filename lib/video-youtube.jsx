var React = require('react');
var ajax = require('../utils/ajax');
var VideoMixin = require('./video-mixin');

module.exports = React.createClass({
  mixins: [VideoMixin],
  getDefaultProps() {
    return {from: "youtube"}
  },
  getIframeUrl() {
    return `//youtube.com/embed/${this.props.id}?autoplay=1`
  },
  fetch() {
    var id = this.props.id;
    var url = `https://gdata.youtube.com/feeds/api/videos/${id}?v=2&alt=json`;

    ajax.get(url, function(err, res) {
      var gallery = res.entry['media$group']['media$thumbnail'];
      var thumb = gallery.sort((a, b) => b.width - a.width)[0].url;

      this.setState({
        thumb: thumb,
        imageLoaded: true
      });
    }.bind(this));
  }
});
