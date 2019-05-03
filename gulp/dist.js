const gulp = require('gulp')
const gulpZip = require('gulp-zip')
const config = require('./gulpconfig.js')

gulp.task('dist:firefox', function () {
  return gulp.src(config.extensionFolderFirefox + '/**/*')
    .pipe(gulpZip(config.pkg.name + '-' + config.pkg.version + '.zip'))
    .pipe(gulp.dest(config.distFolderFirefox))
})

gulp.task('dist:chrome', function () {
  return gulp.src(config.extensionFolderChrome + '/**/*')
    .pipe(gulpZip(config.pkg.name + '-' + config.pkg.version + '.zip'))
    .pipe(gulp.dest(config.distFolderChrome))
})
