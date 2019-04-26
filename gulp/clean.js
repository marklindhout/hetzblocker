const gulp = require('gulp')
const del = require('del')
const config = require('./gulpconfig.js')

// Clean the build and dist folders
gulp.task('clean', function () {
  return del([
    config.buildFolder,
    config.distFolder
  ])
})
