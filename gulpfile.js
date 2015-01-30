'use strict';

var gulp = require('gulp'),
    deploy = require('gulp-gh-pages'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    stylus = require('gulp-stylus'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    argv = require('yargs').argv,
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    nib = require('nib');

gulp.task('webpack', function(callback) {
  var jsFilename = webpackConfig.output.filename;

  if (argv.production || argv.p) {
    webpackConfig.output.filename = gutil.replaceExtension(jsFilename, '.min.js');
    webpackConfig.plugins = webpackConfig.plugins.concat(
      new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  webpack(webpackConfig).run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

gulp.task('css', function () {
  if (argv.production || argv.p) {
    return gulp.src('./dist/react-video.css')
      .pipe(minifyCSS())
      .pipe(rename({ suffix: '.min'}))
      .pipe(header(require('./utils/banner')))
      .pipe(gulp.dest('./dist'));
  }
  else {
    return gulp.src('./lib/*.styl')
      .pipe(stylus({ use: [nib()], errors: true }))
      .pipe(header(require('./utils/banner')))
      .pipe(gulp.dest('./dist'));
  }
});

gulp.task('server', function() {
  browserSync({
    open: false,
    notify: false,
    server: {
      baseDir: ['example', 'dist']
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./lib/**/*.jsx', ['webpack', browserSync.reload]);
  gulp.watch('./lib/*.styl', ['css', browserSync.reload]);
});

gulp.task('deploy', function () {
  gulp.src('./docs/**/*')
    .pipe(deploy());
});

gulp.task('bundle', shell.task([
  'gulp webpack',
  'gulp webpack -p',
  'gulp css',
  'gulp css -p',
  'gulp deploy'
]));

gulp.task('default', ['css', 'webpack', 'server', 'watch']);
