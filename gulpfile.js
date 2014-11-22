var gulp = require('gulp'),
    livereload = require('connect-livereload'),
    connect = require('connect'),
    serveStatic = require('serve-static')
    browserify = require('gulp-browserify')
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('default', function() {
  // place code for your default task here
});

// Connect
gulp.task('connect', function () {
  var app = connect()
    .use(livereload())
    .use('/', serveStatic('./.tmp/', {index : ['index.html']}));

  require('http').createServer(app)
    .listen(3000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:3000');
    });
});

gulp.task('assets', function() {
    return gulp.src('app/assets/**/*')
        .pipe(gulp.dest('./.tmp/assets/'));
});

gulp.task('html', ['assets'], function(){
  return gulp.src('app/**/*.html')
      .pipe(gulp.dest('./.tmp/'));
});

gulp.task('browserify', function(){
 gulp.src("./app/index.js")
   .pipe(browserify({
      debug : true,
      cache : {},
      fullPaths : true,
      shim: {
        'angular': {
          path: './bower_components/angular/angular.js',
          exports: 'angular'
        },
        'angular-route': {
          path: './bower_components/angular-route/angular-route.js',
          exports: 'null',
          depends: {
            angular: 'angular'
          }
        }
      }
   })) 
   .pipe(gulp.dest('./.tmp/'));
});

gulp.task('watch',['browserify', 'html', 'connect'], function(){
  var server = livereload.listen();
  gulp.watch([
        './.tmp/**/*'
    ]).on('change', function(file) {
      server.changed({
        body: {
          files : [file.path]
        }
      });
    }).on('error', function(){
      console.warn('error');
    });


  gulp.watch(['./app/**/*.html', './app/assets/**/*'], ['html']).on('error', function(error){
    console.warn(error);
  });
  gulp.watch('./app/**/*.js', ['jshint', 'browserify']).on('error', function (error){
    console.warn(error);
  });
});
