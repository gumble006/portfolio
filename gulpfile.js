'use strict';

var   gulp = require('gulp'),

	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename');

gulp.task("concatJS", function(){
	return gulp.src([
		'js/jquery.min.js',
		'js/bootstrap.min.js', 
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

gulp.task("concatCSS", function(){
	return gulp.src([
		'css/normalize.css', 
		'css/bootstrap.css', 
		'css/main.css',
		'css/responsive.css'])
	.pipe(concat("stylesbundle.css"))
	.pipe(gulp.dest("css"));
});

gulp.task("minifyCSS", ["concatCSS"], function(){
	return gulp.src("css/stylesbundle.css")
		.pipe(cleancss())
		.pipe(rename('stylesbundle.min.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('default', ['minifyJS', 'minifyCSS']);