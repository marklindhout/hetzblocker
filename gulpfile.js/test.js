/**
 * @file Gulp tasks for testing JavaScript code.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpJest = require('gulp-jest').default
const gulpLog = require('fancy-log')
const config = require('../project.config.js')

gulp.task('test:js', function (cb) {
  gulp.src(`${config.rootFolder}`)
    .pipe(gulpJest())
    .on('error', function (err) {
      gulpLog.error(err.message)
    })

  cb()
})

gulp.task('test', gulp.parallel('test:js'))
