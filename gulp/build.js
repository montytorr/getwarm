/* global require */
var gulp = require('gulp');
var debug = require('gulp-debug');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var zip = require('gulp-zip');
var browserify = require('browserify');       // Bundles JS
var babelify = require('babelify');           // Transforms React JSX to JS
var source = require('vinyl-source-stream');

var moduleName = 'getwarm';

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// Copy twice all common ressources
////////////////////////////////////////////////////////////////////////////////
// General Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('move_bundle', function () {
    return gulp.src('src/js/bundle.js')
    .pipe(gulp.dest('docker/dist/js'))
});

gulp.task('move_libs', function () {
    return gulp.src('src/js/libs/*.js')
    .pipe(gulp.dest('docker/dist/js/libs'));
});

gulp.task('move_config', function () {
    return gulp.src('src/config.js')
    .pipe(gulp.dest('docker/dist'));
});

gulp.task('move_images', function () {
    return gulp.src('src/img/*')
    .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('docker/dist/img'))
    .pipe($.size());
});

gulp.task('move_mp3', function () {
    return gulp.src('src/*.mp3')
    .pipe(gulp.dest('docker/dist'));
});

gulp.task('move_index', function () {
    var assets;

    return gulp.src('src/index.html')
    .pipe(assets = $.useref.assets())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('docker/dist'));
});

gulp.task('clean', function (done) {
    $.del(['.tmp', 'docker/dist', 'src/css/style.css', 'src/js/bundle.js', 'src/starter-kit.zip'], done);
});

////////////////////////////////////////////////////////////////////////////////
// Compass Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('compass', function() {
    gulp.src('src/scss/style.scss')
    .pipe(plumber())
    .pipe(compass({
        config_file: 'config.rb',
        css: 'src/css',
        sass: 'src/scss',
        require: ['susy']
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('docker/dist/css/'));
});

////////////////////////////////////////////////////////////////////////////////
// JS Task: Browserify the code, compile React JSX files and bundle the JS.
////////////////////////////////////////////////////////////////////////////////
gulp.task('js', function() {
    browserify('./src/js/main.js')
    .transform({global:true}, babelify.configure({
        // tells the Babel parser that the code uses React's JSX.
        presets: ["react"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./docker/dist/js'))
});

////////////////////////////////////////////////////////////////////////////////
// ZIP Tasks
////////////////////////////////////////////////////////////////////////////////
gulp.task('SK-serve', function() {
    return gulp.src('starter-kit/*')
        .pipe(zip('starter-kit.zip'))
        .pipe(gulp.dest('src'));
});

gulp.task('SK-build', function() {
    return gulp.src('starter-kit/*')
        .pipe(zip('starter-kit.zip'))
        .pipe(gulp.dest('docker/dist'));
});

////////////////////////////////////////////////////////////////////////////////
//XX BUILD TASK
////////////////////////////////////////////////////////////////////////////////
gulp.task('build', [
    'js',
    'compass',
    'SK-build',
    'move_bundle',
    'move_libs',
    'move_config',
    'move_images',
    'move_mp3',
    'move_index'
]);
