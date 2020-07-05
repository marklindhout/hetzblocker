const gulp = require('gulp')
const gulpJest = require('gulp-jest').default
const config = require('./gulpconfig.js')

// Generate HTML documentation
gulp.task('test:js', function (cb) {
  // gulp.src([
  //   config.sourceFolder + '/js/**/*.js',
  //   '!' + config.sourceFolder + '/js/vendor/**/*'
  // ])

  process.env.NODE_ENV = 'test'

  gulp.src(config.testsFolder).pipe(gulpJest({
    'preprocessorIgnorePatterns': [
      config.buildFolder,
      config.distFolder,
      // '<rootDir>/node_modules/',
      config.sourceFolder + '/js/vendor/'
    ],
    'automock': false
  }))

  cb()
})

gulp.task('test', gulp.parallel('test:js'))
