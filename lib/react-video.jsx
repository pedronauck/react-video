var React = require('react');
var classSet = require('../utils/classSet');
var ajax = require('../utils/ajax');
var PlayButton = require('./components/play-button');
var Spinner = require('./components/spinner');

module.exports = React.createClass({
  displayName: 'Video',
  propTypes: {
    from: React.PropTypes.oneOf(['youtube']),
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
    }
  },
  componentDidUpdate() {
    if (!this.state.imageLoaded) {
      this.isYoutube() && this.fetchYoutubeData();
    }

    var player = new YT.Player('player_' + this.props.videoId, {
      height: '390',
      width: '640',
      videoId: this.props.videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });

  },
  onPlayerStateChange: function (event) {
    if (event.data == YT.PlayerState.ENDED) {
      this.setState({
        showingVideo: false
      });
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
          <div id={'player_' + this.props.videoId}></div>
        </div>
      );
    }
  },
  playVideo(ev) {
    this.setState({ showingVideo: true });
    ev.preventDefault();
  },
  getIframeUrl() {
    return `//youtube.com/embed/${this.props.videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`
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
  }
});
