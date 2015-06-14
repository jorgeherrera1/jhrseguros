'use strict';

var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence');

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

// copy normalize.css and rename to sass
gulp.task('css-to-sass', function() {
    return gulp.src(['bower_components/normalize.css/normalize.css'])
        .pipe(gulpPlugins.rename(function(file) {
            file.basename = '_' + file.basename;
            file.extname = '.scss';
        }))
        .pipe(gulp.dest('app/styles'));
});

// Optimize images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulpPlugins.cache(gulpPlugins.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(gulpPlugins.size({title: 'images'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulpPlugins.size({title: 'fonts'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
    return gulp.src([
        'app/*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'))
        .pipe(gulpPlugins.size({title: 'copy'}));
});

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
        .pipe(gulpPlugins.csso())
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulpPlugins.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
    var assets = gulpPlugins.useref.assets({searchPath: '{tmp,app}'});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // Concatenate and minify JavaScript
        .pipe(gulpPlugins.if('*.js', gulpPlugins.uglify({preserveComments: 'some'})))
        .pipe(assets.restore())
        .pipe(gulpPlugins.useref())
        // Minify any HTML
        .pipe(gulpPlugins.if('*.html', gulpPlugins.minifyHtml()))
        // Output files
        .pipe(gulp.dest('dist'))
        .pipe(gulpPlugins.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['tmp', 'dist'], {dot: true}));

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['html', 'images', 'fonts', 'copy'], cb);
});