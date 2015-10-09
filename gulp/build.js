/* global require */
var gulp = require('gulp');
var debug = require('gulp-debug');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

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
    .pipe(gulp.dest('dist/js'))
});

gulp.task('move_libs', function () {
    return gulp.src('src/js/libs/*.js')
    .pipe(gulp.dest('dist/js/libs'));
});

gulp.task('move_config', function () {
    return gulp.src('src/config.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('move_images', function () {
    return gulp.src('src/img/*')
    .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe($.size());
});

gulp.task('move_mp3', function () {
    return gulp.src('src/*.mp3')
    .pipe(gulp.dest('dist'));
});

gulp.task('move_index', function () {
    var cssFilter = $.filter('src/css/*.css');
    var assets;

    return gulp.src('src/index.html')
    .pipe(assets = $.useref.assets())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (done) {
    $.del(['.tmp', 'dist'], done);
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
    .pipe(gulp.dest('dist/css/'));
});

////////////////////////////////////////////////////////////////////////////////
//XX BUILD TASK
////////////////////////////////////////////////////////////////////////////////
gulp.task('build', [
    'js',
    'compass',
    'move_bundle',
    'move_libs',
    'move_config',
    'move_images',
    'move_mp3',
    'move_index'
]);
