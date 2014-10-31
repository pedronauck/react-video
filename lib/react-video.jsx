var React = require('react');
var classSet = require('../utils/classSet');
var ajax = require('../utils/ajax');
var PlayButton = require('./components/play-button');
var Spinner = require('./components/spinner');

module.exports = React.createClass({
  displayName: 'Video',
  propTypes: {
    from: React.PropTypes.oneOf(['youtube', 'vimeo']).isRequired,
    id: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      className: 'video'
    };
  },
  getInitialState() {
    return {
      width: 0,
      height: 0,
      thumb: null,
      imageLoaded: false,
      showingVideo: false
    };
  },
  componentDidMount() {
    this.getSizes();
    this.props.from === 'youtube' && this.fetchYoutubeData();
    this.props.from === 'vimeo' && this.fetchVimeoData();
  },
  render() {
    var className = `${this.props.from}-video`;
    var style = {
      width: this.state.width,
      height: this.state.height
    };

    return (
      <div className={this.props.className} style={style}>
        <div className={className}>
          {!this.state.imageLoaded && <Spinner />}
          {this.renderImage()}
          {this.renderIframe()}
        </div>
      </div>
    );
  },
  renderImage() {
    var style = {
      width: this.state.width,
      height: this.state.height,
      backgroundImage: `url(${this.state.thumb})`
    };

    if (this.state.imageLoaded && !this.state.showingVideo) {
      return (
        <div className='video-image' style={style}>
          <PlayButton onClick={this.playVideo} />
        </div>
      );
    }
  },
  renderIframe() {
    var embedVideoStyle = {
      display: this.state.showingVideo ? 'block' : 'none'
    };

    if (this.state.showingVideo) {
      return (
        <div className='video-embed' style={embedVideoStyle}>
          <iframe
            frameborder='0'
            src={this.getIframeUrl()}
            width={this.state.width}
            height={this.state.height}></iframe>
        </div>
      );
    }
  },
  playVideo(ev) {
    this.setState({ showingVideo: true });
    ev.preventDefault();
  },
  getIframeUrl() {
    if (this.props.from === 'youtube') {
      return `//youtube.com/embed/${this.props.id}?autoplay=1`
    }
    else if (this.props.from === 'vimeo') {
      return `//player.vimeo.com/video/${this.props.id}?autoplay=1`
    }
  },
  getSizes() {
    var $el = this.getDOMNode();
    var $parent = $el.parentNode;
    var parentWidth = $parent.clientWidth || 600;

    this.setState({
      width: parentWidth,
      height: this.getProportionalHeight(parentWidth)
    });
  },
  getProportionalHeight(width) {
    return width * 0.5625;
  },
  fetchYoutubeData() {
    var id = this.props.id;
    var url = `https://gdata.youtube.com/feeds/api/videos/${id}?v=2&alt=json`;

    ajax.get(url, (err, res) => {
      var gallery = res.entry['media$group']['media$thumbnail'];
      var thumb = gallery.sort((a, b) => b.width - a.width)[0].url;

      this.setState({
        thumb: thumb,
        imageLoaded: true
      });
    });
  },
  fetchVimeoData() {
    var id = this.props.id;
    var url = `https://vimeo.com/api/v2/video/${id}.json`;

    ajax.get(url, (err, res) => {
      this.setState({
        thumb: res[0].thumbnail_large,
        imageLoaded: true
      });
    });
  }
});
