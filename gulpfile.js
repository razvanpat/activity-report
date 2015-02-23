/* global module, $, require */

(function () {
	'use strict';
}());


var gulp = require('gulp'),
	livereload = require('connect-livereload'),
	gulp_livereload = require('gulp-livereload'),
	connect = require('connect'),
	serveStatic = require('serve-static'),
	browserify = require('gulp-browserify'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	less = require('gulp-less'),
	runSequence = require('run-sequence'),
	mocha = require('gulp-mocha');

gulp.task('default', function () {
	// place code for your default task here
});

// Connect
gulp.task('connect', function () {
	var app = connect()
		.use(livereload())
		.use('/', serveStatic('./.tmp/', {index: ['index.html']}));

	require('http').createServer(app)
		.listen(3000)
		.on('listening', function () {
			console.log('Started connect web server on http://localhost:3000');
		});
});

gulp.task('assets', function () {
	return gulp.src('./assets/**/*')
		.pipe(gulp.dest('./.tmp/assets/'));
});

gulp.task('html', ['assets'], function () {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('./.tmp/'));
});

gulp.task('jshint', function () {
	return gulp.src(['./app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});
/*
 gulp.task('less', function() {
 return gulp.src(['./bower_components/bootstrap/less/bootstrap.less'])
 .pipe(less())
 .pipe(gulp.dest('./assets/css'));
 })
 */
gulp.task('browserify', function () {
	gulp.src("./app/index.js")
		.pipe(browserify({
			debug: true,
			cache: {},
			fullPaths: true,
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
				},
				'angular-resource': {
					path: './bower_components/angular-resource/angular-resource.js',
					exports: 'null',
					depends: {
						angular: 'angular'
					}
				}
			}
		}))
		.pipe(gulp.dest('./.tmp/'));
});

gulp.task('watch', ['jshint', 'browserify', 'html', 'connect'], function () {
	var server = gulp_livereload.listen();
	gulp.watch([
		'./.tmp/**/*'
	]).on('change', function (file) {
		server.changed({
			body: {
				files: [file.path]
			}
		});
	}).on('error', function () {
		console.warn('error');
	});


	gulp.watch(['app/**/*.html', 'assets/**/*'], ['html']).on('error', function (error) {
		console.warn(error);
	});
	gulp.watch('app/**/*.js', ['jshint', 'browserify']).on('error', function (error) {
		console.warn(error);
	});
});


function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('jshint', function () {
	return gulp.src(["./app/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});


gulp.task('test', function (callback) {
	runSequence('jshint', 'test-nojshint', function () {
		callback();
	});
});

gulp.task('test-nojshint', function () {
	return gulp.src('app/**/*.spec.js')
		.pipe(mocha({
			reporter: 'spec'
		}))
		.on('error', handleError);
});

gulp.task('test-watch', ['test'], function () {
	gulp.watch(['app/**/*.js'], ['test']).on('error', handleError);
});
