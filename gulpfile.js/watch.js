/**
 * @file Gulp tasks for file watchers of various type.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const config = require('../project.config.js')

gulp.task('watch:style', function () {
  gulp.watch(config.sourceFolder + '/less/**/*', gulp.parallel('style'))
})

gulp.task('watch:html', function () {
  gulp.watch(config.sourceFolder + '/html/**/*', gulp.parallel('html'))
})

gulp.task('watch:i18n', function () {
  gulp.watch(config.sourceFolder + '/i18n/**/*', gulp.parallel('i18n'))
})

gulp.task('watch:icon', function () {
  gulp.watch(config.sourceFolder + '/icon/**/*', gulp.parallel('icon'))
})

gulp.task('watch:script', function () {
  gulp.watch([`${config.sourceFolder}/js/**/*`, `${config.testsFolder}/**/*`], gulp.parallel('test', 'script', 'docs'))
})

gulp.task('watch:template', function () {
  gulp.watch(config.sourceFolder + '/templates/**/*', gulp.parallel('template'))
})

gulp.task('watch', gulp.parallel('watch:style', 'watch:html', 'watch:i18n', 'watch:icon', 'watch:script', 'watch:template'))
