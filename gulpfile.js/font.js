/**
 * @file Gulp tasks for copying fonts during build.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const config = require('../project.config.js')

gulp.task('font', function () {
  return gulp.src(config.sourceFolder + '/font/**/*')
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/font/'))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/font/'))
})
