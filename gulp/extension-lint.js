const gulp = require('gulp')
const webExt = require('web-ext').default
const config = require('./gulpconfig.js')

gulp.task('extension:lint:firefox', function () {
  return webExt.cmd.lint(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:lint', gulp.parallel('extension:lint:firefox'))
