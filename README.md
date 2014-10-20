# React Video

![Git release](http://img.shields.io/github/release/pedronauck/react-video.svg?style=flat) ![Travis](http://img.shields.io/travis/pedronauck/react-video.svg?style=flat) ![license](http://img.shields.io/npm/l/react-video.svg?style=flat)

[![NPM](https://nodei.co/npm/react-video.png)](https://nodei.co/npm/react-video/)

React `<Video />` component to load video from Vimeo or Youtube across any device. Inspired by [PrettyEmbed.js](https://github.com/mike-zarandona/PrettyEmbed.js)

## Install

Installing this component is very easy and it has just one dependency: [React](http://facebook.github.io/react/downloads.html). So, you have a lot of options to do that:

- Using NPM *~the quickest way~*
```bash
  $ npm install --save react-youtube
```

- Using Bower
```bash
  $ bower install --save react-youtube
```

- Or if you want to [download the lastest release](https://github.com/pedronauck/react-video/archive/v0.0.1.zip) and put in your website, it will work too!

**NOTICE:** You need just one thing to make the component work. Put the [base component style](./dist/react-video.css) at the `<header>` tag. If you don't wanna use the `.css` extension, you can get the `.styl` or `.scss` extension at the folder `./lib`.

Then you're done! :smile_cat:

## Usage

Using the component is simpler than installing. See an example with [browserify](http://truongtx.me/2014/07/18/using-reactjs-with-browserify-and-gulp/) to bundle your script:

```javascript
// browserify example here
```

If you decide to use just Javascript without any module loader, you can get the global variable `window.ReactVideo` *(or just `ReactVideo`)*:

```javascript
  /** @jsx React.DOM */

  var Video = ReactVideo;
  var App = React.createClass({
    render: function() {
      ...
    }
  });
```

## Behind the Scene

There are some things that you should know about the component. The first one is the structure created inside by the component if you wish to stylize it.

So, the semantic HTML structure will be something like this:

```html
  <!-- showing semantic structure -->
```

This is a very simple structure to stylize however you want. So, if you are lost, don't panic, there is a [real functional example](/example) that you can follow.

The other thing that I have to share with you is that the component has some properties that you can use. Example:

#### TODO: Talking about component default properties

For more details, check out the API below.

## Component API

`<Video>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
propery | `Type` | 1 | no | Some description

## Contributing

Anyone can help make this project better - check out the [Contributing guide](CONTRIBUTING.md)!

## License

See the [License](LICENSE) file.
