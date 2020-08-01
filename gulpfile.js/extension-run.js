/**
 * @file Gulp tasks for running the extension using `web-ext`.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const webExt = require('web-ext')
const config = require('../project.config.js')

gulp.task('extension:run:firefox', function () {
  return webExt.cmd.run(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:run', gulp.parallel('extension:run:firefox'))
