"use strict";
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress-js', function() {
    return gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
    console.log('Ran default task.');
});