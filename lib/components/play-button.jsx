var React = require('react');

module.exports = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render() {
    return (
      <button type='button' className='video-play-button' onClick={this.props.onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 100 100'>
          <path d="M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z"/>
        </svg>
      </button>
    );
  }
});
