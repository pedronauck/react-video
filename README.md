# React Video

![Git release](http://img.shields.io/github/release/pedronauck/react-video.svg?style=flat) ![Travis](http://img.shields.io/travis/pedronauck/react-video.svg?style=flat) ![license](http://img.shields.io/npm/l/react-video.svg?style=flat)

![](http://f.cl.ly/items/440F3Y0w1l293g3e3g3N/cover.png)

A pretty good and effective way to create a video placeholder from Youtube or Vimeo using a high-res image. If you don't know, when an `<iframe>` is rendered from browser, it blocks its parse because it isn't a [non-blocking script](http://www.nczonline.net/blog/2010/08/10/what-is-a-non-blocking-script/). This isn't so good to your user, no?. With this react component, the `<iframe>` just will be loaded when the user click on play.

## Install

Installing this component is very easy and it has just one dependency: [React](http://facebook.github.io/react/downloads.html). So, you have a lot of options to do that:

- Using NPM *~the quickest way~*
```bash
  $ npm install --save react-video
```

- Using Bower
```bash
  $ bower install --save react-video
```

- Or if you want to [download the lastest release](https://github.com/pedronauck/react-video/archive/v1.5.3.zip) and put in your website, it will work too!

**NOTICE:** You need just one thing to make the component work. Put the [base component style](./dist/react-video.css) at the `<header>` tag. If you don't wanna use the `.css` extension, you can get the `.styl` or `.scss` extension at the folder `./lib`.

Then you're done! :smile_cat:

## Usage

Using the component is simpler than installing. See an example with [browserify](http://truongtx.me/2014/07/18/using-reactjs-with-browserify-and-gulp/) to bundle your script:

```javascript
  var Video = require('react-video');

  // Video from Youtube
  React.render(
    <Video from='youtube' videoId={videoId} />,
    $mountNode
  );

  // Video from Vimeo
  React.render(
    <Video from='vimeo' videoId={videoId} />,
    $mountNode
  );
```

The property `videoId` is optional, so you can use it or not. If you don't pass the property, the component will select your type of video based on your id.

```javascript
  React.render(
    <Video videoId={videoId} />
    document.querySelector('#your-div')
  );
```

To handle errors when something happens, like your video can't be loaded, you can pass a callback with a prop `onError` in the component:

```javascript
  var _onError = function(err) {
    console.log(err);
  };

  React.render(
    <Video onError={_onError} videoId={videoId} />
    document.querySelector('#your-div')
  );
```

If you decide to use just Javascript without any module loader, you can get the global variable `window.ReactVideo` *(or just `ReactVideo`)*:

```javascript
  /** @jsx React.DOM */

  var Video = ReactVideo;
```

## Behind the Scene

There are some things that you should know about the component. The first one is the structure created inside by the component if you wish to stylize it.

So, the semantic HTML structure will be something like this:

```html
  <div class='video'>
    <div class='video-loading'>
      <svg>...</svg>
    </div>
    <div class='video-image'>
      <button type='button' class='video-play-button'>
        <svg>...</svg>
      </button>
    </div>
    <div class='video-embed'>
      <iframe>...</iframe>
    </div>
  </div>
```

This is a very simple structure to stylize however you want. So, if you are lost, don't panic, there is a [real functional example](/example) that you can follow.

For more details, check out the API below.

## Component API

`<Video>` component:

Property | Type | Default | Required | Description
-------- | ---- | ------- | -------- |-----------
from | `String` | none | no | Video source: `youtube` or `vimeo`. Leave empty and the service will be detected for you by looking a the id.
videoId | `String` | none | no | The video ID
onError | `Function` | yes | no | Callback function if the video can't be loaded

## Contributing

Anyone can help make this project better - check out the [Contributing guide](CONTRIBUTING.md)!

## License

See the [License](LICENSE) file.
