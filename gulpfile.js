'use strict';

var   gulp = require('gulp'),

	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	purify = require('gulp-purifycss');

gulp.task("concatJS", function(){
	return gulp.src([
		// 'js/jquery.min.js',
		// 'js/bootstrap.min.js',
		'js/script.js'])
	.pipe(concat("scriptbundle.js"))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyJS", ["concatJS"], function(){
	return gulp.src("js/scriptbundle.js")
		.pipe(uglify())
		.pipe(rename('scriptbundle.min.js'))
		.pipe(gulp.dest('js'));
});

//Concat and remove unused
gulp.task("concatCSS", function(){
	return gulp.src([
		'css/normalize.css', 
		'css/bootstrap.css', 
		'css/main.css',
		'css/responsive.css'])
	.pipe(concat("stylesbundle.css"))
	.pipe(purify(['./index.html']))
	.pipe(gulp.dest("css"));
});

gulp.task("minifyCSS", ["concatCSS"], function(){
	return gulp.src("./css/stylesbundle.css")
		.pipe(cleancss())
		.pipe(rename('stylesbundle.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['minifyCSS']);
  gulp.watch('js/*.js', ['minifyJS']);
});

gulp.task('default', ['minifyJS', 'minifyCSS']);