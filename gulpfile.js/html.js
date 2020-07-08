/**
 * @file Gulp tasks for compiling and copying HTML files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpTwig = require('gulp-twig')
const config = require('../project.config.js')

gulp.task('html', function () {
  return gulp.src(config.sourceFolder + '/html/*.html.twig')
    .pipe(gulpTwig({ data: config, extname: false }))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/html/'))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/html/'))
})
