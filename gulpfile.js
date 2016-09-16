'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'client/',
    angularTsSrc = 'client/',
    serverTsSrc = 'server/';

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server/server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server/server.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000

  });
});

gulp.task('copylibs', function() {
  return gulp
      .src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-shim/es6-shim.min.map',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js'
      ])
      .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

gulp.task('compile-angular', function () {
  return gulp
      .src(angularTsSrc + '**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(typescript(tscConfig.compilerOptionsFE))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(function(file) {
          return file.base;
      }));
      //.pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('compile-server', function () {
    return gulp
        .src(serverTsSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptionsBE))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));
});

gulp.task('js',  function () {
  return gulp.src('client/**/*.js');
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('client/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['copylibs', 'compile-angular', 'compile-server', 'browser-sync'], function () {
  gulp.watch('client/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('client/**/*.css',  ['css']);
  gulp.watch('client/**/*.html', ['bs-reload']);
  gulp.watch('server/**/*.ts', ['compile-server']);
  gulp.watch('client/**/*.ts', ['compile-angular']);
});
