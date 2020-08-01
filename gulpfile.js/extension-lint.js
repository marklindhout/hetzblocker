/**
 * @file Gulp tasks for linting the extension using `web-ext`.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const webExt = require('web-ext')
const config = require('../project.config.js')

gulp.task('extension:lint:firefox', function () {
  return webExt.cmd.lint(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:lint', gulp.parallel('extension:lint:firefox'))
