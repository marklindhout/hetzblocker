/**
 * @file Gulp tasks for generating documentation.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpDocumentation = require('gulp-documentation')
const config = require('../project.config.js')

// Generate HTML documentation
gulp.task('docs:background', function (cb) {
  gulp.src([
    config.sourceFolder + '/js/**/*.js',
    '!' + config.sourceFolder + '/js/vendor/**/*'
  ])
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest(config.buildFolder + '/docs'))

  cb()
})

gulp.task('docs', gulp.parallel('docs:background'))
