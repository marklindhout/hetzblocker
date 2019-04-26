const gulp = require('gulp')
const gulpDocumentation = require('gulp-documentation')
const config = require('./gulpconfig.js')

// Generate HTML documentation
gulp.task('docs:background', function () {
  return gulp.src([
    config.sourceFolder + '/js/**/*.js',
    '!' + config.sourceFolder + '/js/vendor/**/*'
  ])
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest(config.buildFolder + '/docs'))
})

gulp.task('docs', gulp.parallel('docs:background'))
