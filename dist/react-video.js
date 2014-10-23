/*
 * React Video - React component to load video from Vimeo or Youtube across any device
 * @version v1.0.1
 * @link https://github.com/pedronauck/react-video
 * @license MIT
 * @author Pedro Nauck (https://github.com/pedronauck)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactVideo"] = factory(require("react"));
	else
		root["ReactVideo"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var classSet = __webpack_require__(4);
	var ajax = __webpack_require__(5);
	var PlayButton = __webpack_require__(6);
	var Spinner = __webpack_require__(7);

	var Youtube = __webpack_require__(2);
	var Vimeo = __webpack_require__(3);

	module.exports = {
	  Youtube: Youtube,
	  Vimeo: Vimeo
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var ajax = __webpack_require__(5);
	var VideoMixin = __webpack_require__(8);

	module.exports = React.createClass({displayName: 'exports',
	  mixins: [VideoMixin],
	  getDefaultProps:function() {
	    return {from: "youtube"}
	  },
	  getIframeUrl:function() {
	    return ("//youtube.com/embed/" + this.props.id + "?autoplay=1")
	  },
	  fetch:function() {
	    var id = this.props.id;
	    var url = ("https://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json");

	    ajax.get(url, function(err, res) {
	      var gallery = res.entry['media$group']['media$thumbnail'];
	      var thumb = gallery.sort(function(a, b)  {return b.width - a.width;})[0].url;

	      this.setState({
	        thumb: thumb,
	        imageLoaded: true
	      });
	    }.bind(this));
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var ajax = __webpack_require__(5);
	var VideoMixin = __webpack_require__(8);

	module.exports = React.createClass({displayName: 'exports',
	  mixins: [VideoMixin],
	  getDefaultProps:function() {
	    return {from: "vimeo"}
	  },
	  getIframeUrl:function() {
	    return ("//player.vimeo.com/video/" + this.props.id + "?autoplay=1")
	  },
	  fetch:function() {
	    var id = this.props.id;
	    var url = ("http://vimeo.com/api/v2/video/" + id + ".json");

	    ajax.get(url, function(err, res) {
	      this.setState({
	        thumb: res[0].thumbnail_large,
	        imageLoaded: true
	      });
	    }.bind(this));
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM *//**
	 * Produces the same result as React.addons.classSet
	 * @param  {object} classes
	 * @return {string}
	 *
	 * @author Ciro S. Costa <https://github.com/cirocosta>
	 */

	module.exports = function(classes)  {
	  return typeof classes !== 'object' ?
	    Array.prototype.join.call(arguments, ' ') :
	    Object.keys(classes).filter(function(className)  {return classes[className];}).join(' ');
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var get = function(url, cb) {
	  var req = new XMLHttpRequest();

	  req.open('GET', url, true);
	  req.onload = function() {
	    if (req.status === 200 && req.status < 400) {
	      cb(null, JSON.parse(req.responseText));
	    }
	    else {
	      cb({ error: 'Sorry, an error ocurred on the server' }, null);
	    }
	  };

	  req.onerror = function() {
	    cb({ error: 'Problem with your internet conection' }, null);
	  };

	  req.send();
	};

	module.exports = { get: get };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: 'exports',
	  propTypes: {
	    onClick: React.PropTypes.func
	  },
	  render:function() {
	    return (
	      React.DOM.button({type: "button", className: "video-play-button", onClick: this.props.onClick}, 
	        React.DOM.svg({xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 100 100"}, 
	          React.DOM.path({d: "M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z"})
	        )
	      )
	    );
	  }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: 'exports',
	  render:function() {
	    return (
	      React.DOM.div({className: "video-loading"}, 
	        React.DOM.svg({xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: "32", height: "32"}, 
	          React.DOM.path({opacity: ".25", d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}), 
	          React.DOM.path({d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"})
	        )
	      )
	    );
	  }
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var classSet = __webpack_require__(4);
	var ajax = __webpack_require__(5);
	var PlayButton = __webpack_require__(6);
	var Spinner = __webpack_require__(7);

	module.exports = {
	  displayName: 'Video',
	  propTypes: {
	    id: React.PropTypes.string
	  },
	  getDefaultProps:function() {
	    return {
	      className: 'video'
	    };
	  },
	  getInitialState:function() {
	    return {
	      width: 0,
	      height: 0,
	      thumb: null,
	      imageLoaded: false,
	      showingVideo: false
	    };
	  },
	  componentDidMount:function() {
	    this.getSizes();
	    this.fetch();
	  },
	  render:function() {
	    var className = (this.props.from + "-video");
	    var style = {
	      width: this.state.width,
	      height: this.state.height
	    };

	    return (
	      React.DOM.div({className: this.props.className, style: style}, 
	        React.DOM.div({className: className}, 
	          !this.state.imageLoaded && Spinner(null), 
	          this.renderImage(), 
	          this.renderIframe()
	        )
	      )
	    );
	  },
	  renderImage:function() {
	    var style = {
	      width: this.state.width,
	      height: this.state.height,
	      backgroundImage: ("url(" + this.state.thumb + ")")
	    };

	    if (this.state.imageLoaded && !this.state.showingVideo) {
	      return (
	        React.DOM.div({className: "video-image", style: style}, 
	          PlayButton({onClick: this.playVideo})
	        )
	      );
	    }
	  },
	  renderIframe:function() {
	    var embedVideoStyle = {
	      display: this.state.showingVideo ? 'block' : 'none'
	    };

	    if (this.state.showingVideo) {
	      return (
	        React.DOM.div({className: "video-embed", style: embedVideoStyle}, 
	          React.DOM.iframe({
	            frameborder: "0", 
	            src: this.getIframeUrl(), 
	            width: this.state.width, 
	            height: this.state.height})
	        )
	      );
	    }
	  },
	  playVideo:function(ev) {
	    this.setState({ showingVideo: true });
	    ev.preventDefault();
	  },
	  getSizes:function() {
	    var $el = this.getDOMNode();
	    var $parent = $el.parentNode;
	    var parentWidth = $parent.clientWidth || 600;

	    this.setState({
	      width: parentWidth,
	      height: this.getProportionalHeight(parentWidth)
	    });
	  },
	  getProportionalHeight:function(width) {
	    return width * 0.5625;
	  }
	};


/***/ }
/******/ ])
});
