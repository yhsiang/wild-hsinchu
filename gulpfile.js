'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


gulp.task('styles', function() {
  var browsers = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1'
  ];
  return gulp.src('src/**/*.less')
    .pipe($.less({
      paths: ['bower_components']
    })
    .on('error', $.util.log))
    .pipe($.postcss([
        require('autoprefixer-core')({
          browsers: browsers
        })
      ]))
    .pipe(gulp.dest('build'));
});


gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
      .pipe(gulp.dest('build/js'))
});

gulp.task('views', function(){
  return gulp.src([
      '!src/views/layout.jade',
      'src/views/*.jade'
    ])
    .pipe($.jade({
      pretty: true
    }))
    .on('error', $.util.log)
    .pipe(gulp.dest('build'));
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.imagemin({
      svgoPlugins: [{
        convertPathData: false
      }]
    }))
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.less', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/**/*.jade', ['views']);
  gulp.watch('src/js/*.js', ['scripts']);

  var connect = require('connect');
  var serveStatic = require('serve-static');
  connect()
    .use(serveStatic('build'))
    .listen(3000);
});

// JSHint grunfile.js
gulp.task('selfcheck', function() {
  return gulp.src('gulpfile.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});


gulp.task('clean', function(cb) {
  var del = require('del');
  del(['build'], cb);
});


gulp.task('build', ['styles', 'views', 'images', 'fonts', 'scripts']);


gulp.task('default', ['clean'], function() {
  gulp.start('watch');
});
