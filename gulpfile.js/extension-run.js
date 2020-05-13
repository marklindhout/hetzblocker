const gulp = require('gulp')
const webExt = require('web-ext').default
const config = require('./gulpconfig.js')

gulp.task('extension:run:firefox', function () {
  return webExt.cmd.run(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:run', gulp.parallel('extension:run:firefox'))
