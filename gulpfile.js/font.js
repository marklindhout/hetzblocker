const gulp = require('gulp')
const config = require('./gulpconfig.js')

gulp.task('font', function () {
  return gulp.src(config.sourceFolder + '/font/**/*')
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/font/'))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/font/'))
})
