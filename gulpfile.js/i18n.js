const gulp = require('gulp')
const config = require('./gulpconfig.js')

// Copy over localization files
gulp.task('i18n:firefox', function () {
  return gulp.src(config.sourceFolder + '/i18n/**/*')
    .pipe(gulp.dest(config.extensionFolderFirefox + '/_locales/'))
})

gulp.task('i18n:chrome', function () {
  return gulp.src(config.sourceFolder + '/i18n/**/*')
    .pipe(gulp.dest(config.extensionFolderChrome + '/_locales/'))
})

gulp.task('i18n', gulp.parallel('i18n:firefox', 'i18n:chrome'))
