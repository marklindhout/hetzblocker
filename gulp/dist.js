const gulp = require('gulp')
const webExt = require('web-ext').default
const config = require('./gulpconfig.js')

gulp.task('dist:firefox', function () {
  return webExt.cmd.build(config.webExtConfigFirefox, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('dist:chrome', function () {
  return webExt.cmd.build(config.webExtConfigChrome, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('dist', gulp.parallel('dist:firefox', 'dist:chrome'))
