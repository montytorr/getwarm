'use strict';

var gulp = require('gulp');
var browserify = require('browserify');       // Bundles JS
var babelify = require('babelify');           // Transforms React JSX to JS
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

// Paths definitions.
var path = {
    html_files: ['./src/**/*.html'],
    app_js: ['./src/js/main.js'],
    jsx_files: ['./src/js/**/*.js*', '!./src/js/bundle.js'],
    scss_files: ['./src/scss/**/*.scss', './node-modules/warm-react/src/scss/**/*.scss']
};

////////////////////////////////////////////////////////////////////////////////
// HTML Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function() {
    gulp.src(path.html_files)
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////////////////////////////
// JS Task: Browserify the code, compile React JSX files and bundle the JS.
////////////////////////////////////////////////////////////////////////////////
gulp.task('js-watch', ['clean','compass-watch'], function() {
    browserify(path.app_js)
    .transform({global:true}, babelify.configure({
        // tells the Babel parser that the code uses React's JSX.
        presets: ["react"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/js'))
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////////////////////////////
// Compass Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('compass-watch', function() {
    gulp.src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(compass({
        config_file: 'config.rb',
        css: 'src/css',
        sass: 'src/scss',
        require: ['susy']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('src/css/'))
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////////////////////////////
// Rerun tasks whenever a file changes.
////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function() {
    gulp.watch(path.html_files, ['html']);
    gulp.watch(path.jsx_files, ['js-watch']);
    gulp.watch(path.scss_files, ['compass-watch']);
});
