var React = require('react');
var classSet = require('../utils/classSet');
var ajax = require('../utils/ajax');
var PlayButton = require('./components/play-button');
var Spinner = require('./components/spinner');

module.exports = React.createClass({
  displayName: 'Video',
  propTypes: {
    from: React.PropTypes.oneOf(['youtube', 'vimeo']),
    videoId: React.PropTypes.string.isRequired,
    onError: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      className: 'video'
    };
  },
  getInitialState() {
    return {
      thumb: null,
      imageLoaded: false,
      showingVideo: false
    };
  },
  isYoutube() {
    return this.props.from === 'youtube' || isNaN(this.props.videoId);
  },
  isVimeo() {
    return this.props.from === 'vimeo' || !isNaN(this.props.videoId);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.className !== this.props.className || nextProps.from !== this.props.from || nextProps.videoId !== this.props.videoId) {
      this.setState({
        thumb: null,
        imageLoaded: false,
        showingVideo: false
      });
    }
  },
  componentDidMount() {
    if (!this.state.imageLoaded) {
      this.isYoutube() && this.fetchYoutubeData();
      this.isVimeo() && this.fetchVimeoData();
    }
  },
  componentDidUpdate() {
    if (!this.state.imageLoaded) {
      this.isYoutube() && this.fetchYoutubeData();
      this.isVimeo() && this.fetchVimeoData();
    }
  },
  render() {
    return (
      <div className={this.props.className} >
        {!this.state.imageLoaded && <Spinner />}
        {this.renderImage()}
        {this.renderIframe()}
      </div>
    );
  },
  renderImage() {
    var style = {
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
      display: this.state.showingVideo ? 'block' : 'none',
      width: '100%',
      height: '100%'
    };

    if (this.state.showingVideo) {
      return (
        <div className='video-embed' style={embedVideoStyle}>
          <iframe frameBorder='0' src={this.getIframeUrl()}></iframe>
        </div>
      );
    }
  },
  playVideo(ev) {
    this.setState({ showingVideo: true });
    ev.preventDefault();
  },
  getIframeUrl() {
    if (this.isYoutube()) {
      return `//youtube.com/embed/${this.props.videoId}?autoplay=1`
    }
    else if (this.isVimeo()) {
      return `//player.vimeo.com/video/${this.props.videoId}?autoplay=1`
    }
  },
  fetchYoutubeData() {
    var id = this.props.videoId;
    var that = this;

    ajax.get({
      url: `//gdata.youtube.com/feeds/api/videos/${id}?v=2&alt=json`,
      onSuccess(err, res) {
        var gallery = res.entry['media$group']['media$thumbnail'];
        var thumb = gallery.sort((a, b) => b.width - a.width)[0].url;

        that.setState({
          thumb: thumb,
          imageLoaded: true
        })
      },
      onError: that.props.onError
    });
  },
  fetchVimeoData() {
    var id = this.props.videoId;
    var that = this;

    ajax.get({
      url: `//vimeo.com/api/v2/video/${id}.json`,
      onSuccess(err, res) {
        that.setState({
          thumb: res[0].thumbnail_large,
          imageLoaded: true
        });
      },
      onError: that.props.onError
    });
  }
});
