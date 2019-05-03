const gulp = require('gulp')
const webExt = require('web-ext').default
const config = require('./gulpconfig.js')

gulp.task('extension:lint:firefox', function (done) {
  webExt.cmd.lint(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(function (err) {
      throw new Error(err)
    })
    .then(done)
})

gulp.task('extension:lint', gulp.parallel('extension:lint:firefox'))
