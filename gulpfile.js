'use strict';

var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins')();

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
    return gulp.src([
        'app/styles/*.scss'])
        .pipe(gulpPlugins.sourcemaps.init())
        .pipe(gulpPlugins.changed('tmp/styles', {extension: '.css'}))
        .pipe(gulpPlugins.sass({
            precision: 10,
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(gulpPlugins.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulpPlugins.sourcemaps.write())
        .pipe(gulp.dest('tmp/styles'))
        // Concatenate and minify styles
        .pipe(gulpPlugins.if('*.css', gulpPlugins.csso()))
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulpPlugins.size({title: 'styles'}));
});