/*jslint node: true */

var gulp = require('gulp');

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === 'src' || (util.isArray(baseDir) && baseDir.indexOf('src') !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    browserSync.instance = browserSync.init(files, {
        startPath: '/index.html',
        server: {
            baseDir: baseDir,
            middleware: middleware,
            routes: routes
        },
        browser: browser
    });

}

gulp.task('serve', ['js', 'watch'], function () {
    browserSyncInit([
        'src',
        '.tmp'
    ], [
        '.tmp/**/*.css', // for less compiled css
        'src/**/*.js'
    ]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit('dist');
});
