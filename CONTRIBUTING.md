# Contributing to React Video

So you're interested in giving us a hand? That's awesome! We've put together some brief guidelines that should help you get started quickly and easily.

Please, if you see anything wrong you can fix/improve it :ghost:

## Installing the project

1. Fork this project on github
1. Clone this project on your local
1. Then, you need to install `node` and `npm` to run the mainly packages.
1. After installed `node` and `npm`, run this script:

```bash
$ npm install
```

That's it! You're done.

## How to work

We are using a bunch of things to put all togethe and make the work easy.

Dependency | Description
---------- | -----------
[NPM](http://npmjs.org) | Node package manager
[Gulp](http://gulpjs.com/) | Run some tasks (bundle, server, etc)
[BrowserSync](http://www.browsersync.io/) | Create a `localhost` server with livereload
[Webpack](http://www.browsersync.io/) | Generated a UMD bundled version
[Jest](http://facebook.github.io/jest/) | Run the tests

So, have some scripts that you need to know to run the project locally. It's just fews, but it's very important.

Command | Description
------- | -----------
`npm run bundle` | run `$ gulp bundle` task
`npm start` | Run `$ gulp default` task
`npm test` | Run all tests with Jest
`gulp` | Default task that runs `gulp webpack`, `gulp server` and `gulp watch`
`gulp webpack` | Run the Webpack bundle
`gulp webpack -p` | Run the Webpack bundle minified
`gulp css` | Compile `.styl` files
`gulp css -p` | Compile `.styl` files in a minified version
`gulp server` | Run the BrowserSync server
`gulp bundle` | Make the entire bundle with Gulp (compressed and uncompreed version)
`gulp watch` | Watch when the lib files change

## Submitting a Pull request

1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -m 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Make sure that all bundles are passing in [TravisCI](https://travis-ci.org/pedronauck/react-video)
1. Submit a pull request :D
