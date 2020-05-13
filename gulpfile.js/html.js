const gulp = require('gulp')
const gulpTwig = require('gulp-twig')
const config = require('./gulpconfig.js')

gulp.task('html', function () {
  return gulp.src(config.sourceFolder + '/html/*.html.twig')
    .pipe(gulpTwig({ data: config, extname: false }))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/html/'))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/html/'))
})
