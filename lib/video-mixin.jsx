var React = require('react');
var classSet = require('../utils/classSet');
var ajax = require('../utils/ajax');
var PlayButton = require('./components/play-button');
var Spinner = require('./components/spinner');

module.exports = {
  displayName: 'Video',
  propTypes: {
    id: React.PropTypes.string
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
    this.fetch();
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
  }
};
