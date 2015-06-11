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

gulp.task('css-to-sass', function() {
    return gulp.src(['bower_components/normalize.css/normalize.css'])
        .pipe(gulpPlugins.cached('css-to-sass'))
        .pipe(gulpPlugins.rename(function(file) {
            file.basename = '_' + file.basename;
            file.extname = '.scss';
        }))
        .pipe(gulp.dest('app/styles'));
});

// Compile and automatically prefix stylesheets
gulp.task('sass', function() {
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
        .pipe(gulpPlugins.csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulpPlugins.size({title: 'styles'}));
});