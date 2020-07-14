/**
 * @file Gulp tasks for compiling and copying style files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpLess = require('gulp-less')
const config = require('../project.config.js')

gulp.task('style', function () {
  return gulp.src(config.sourceFolder + '/less/*.less')
    .pipe(gulpLess())
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/css/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/css/'))
})
