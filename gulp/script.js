const gulp = require('gulp')
const gulpResolveDependencies = require('gulp-resolve-dependencies')
const gulpConcat = require('gulp-concat')
const config = require('./gulpconfig.js')

gulp.task('script:background', function () {
  return gulp.src(config.sourceFolder + '/js/background/main.js')
    .pipe(gulpResolveDependencies())
    .on('error', function (err) {
      console.error(err.message)
    })
    .pipe(gulpConcat('background.js', { newLine: ';' }))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js/'))
})

gulp.task('script:content', function () {
  return gulp.src(config.sourceFolder + '/js/content/main.js')
    .pipe(gulpResolveDependencies())
    .on('error', function (err) {
      console.error(err.message)
    })
    .pipe(gulpConcat('content.js', { newLine: ';' }))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js/'))
})

gulp.task('script', gulp.parallel('script:background', 'script:content'))
