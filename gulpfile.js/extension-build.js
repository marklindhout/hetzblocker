/**
 * @file Gulp tasks for building the extension using `web-ext`.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const webExt = require('web-ext').default
const config = require('../project.config.js')

gulp.task('extension:build:firefox', function () {
  return webExt.cmd.build(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:build:chrome', function () {
  return webExt.cmd.build(config.webExtConfigChrome, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:build', gulp.parallel('extension:build:firefox', 'extension:build:chrome'))
