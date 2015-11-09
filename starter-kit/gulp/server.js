/*jslint node: true */
var gulp = require('gulp');
var browserSync = require('browser-sync');

function browserSyncInit(baseDir, files) {
    browserSync.instance = browserSync.init(files, {
        startPath: '/index.html',
        server: {
            baseDir: baseDir
        },
    });

}

////////////////////////////////////////////////////////////////////////////////
//XX SERVE TASK
////////////////////////////////////////////////////////////////////////////////
gulp.task('serve', ['js', 'compass-rebuild', 'watch'], function () {
    browserSyncInit([
        'src',
        '.tmp'
    ], [
        '.tmp/**/*.css', // for less compiled css
        'src/**/*.js'
    ]);
});

////////////////////////////////////////////////////////////////////////////////
//XX BUILD / SERVE ON DIST
////////////////////////////////////////////////////////////////////////////////
gulp.task('serve:dist', ['build'], function () {
    browserSyncInit('docker/dist');
});
