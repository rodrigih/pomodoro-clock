'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect') //Runs local dev server
var open = require('gulp-open') //Open URL in web browser
var browserify = require('browserify'); //Bundle JS
var reactify = require('reactify'); // Transforms JSX to JS
var source = require('vinyl-source-stream'); // USe conventional text stream
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //lint JS files

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',
  paths: {
      html: './src/*.html',
      js: './src/**/*.js',
      css: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
      ],
      dist: './dist/',
      mainJS: './src/main.js'
  }
}

// Starts local development server
gulp.task('connect',function(){
    connect.server({
      root: ['dist'],
      port: config.port,
      base: config.devBaseUrl,
      livereload: true
    });
});

// Opens 'index.html' after web port has been connected
gulp.task('open',['connect'],function(){
  gulp.src('dist/index.html')
  .pipe(open({
    uri: config.devBaseUrl + ":" + config.port + '/'
  }));
});

// Bundles  HTML files
gulp.task('html',function(){
  gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.dist))
  .pipe(connect.reload());
});

// Bundles CSS files
gulp.task('css',function(){
  gulp.src(config.paths.css)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(config.paths.dist + '/css'));
});

// Bundles JS files
gulp.task('js',function(){
  browserify(config.paths.mainJS)
  .transform(reactify)
  .bundle()
  .on('error',console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist + '/scripts'))
  .pipe(connect.reload());
});

// Lint files from ES6 to ES5
gulp.task('lint',function(){
  return gulp.src(config.paths.js)
  .pipe(lint({config: 'eslint.config.json'}))
  .pipe(lint.format());
});

gulp.task('watch',function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js','lint']);
});

gulp.task('default',['html','js','css','lint','open','watch']);
