/**
 * @file Gulp tasks for compiling and copying templated files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpTwig = require('gulp-twig')
const config = require('../project.config.js')

gulp.task('template:firefox', function () {
  return gulp.src(config.sourceFolder + '/template/firefox/**/*')
    .pipe(gulpTwig({data: config, extname: false}))
    .pipe(gulp.dest(config.extensionFolderFirefox))
})

gulp.task('template:chrome', function () {
  return gulp.src(config.sourceFolder + '/template/chrome/**/*')
    .pipe(gulpTwig({data: config, extname: false}))
    .pipe(gulp.dest(config.extensionFolderChrome))
})

gulp.task('template', gulp.parallel('template:firefox', 'template:chrome'))
