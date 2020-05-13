const gulp = require('gulp')
const gulpConcat = require('gulp-concat')
const gulpResolveDependencies = require('gulp-resolve-dependencies')
const gulpStandard = require('gulp-standard')
const config = require('./gulpconfig.js')

gulp.task('script:background:lint', function () {
  return gulp.src(config.sourceFolder + '/js/background/**/*.js')
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('script:background:build', function () {
  return gulp.src(config.sourceFolder + '/js/background/main.js')
    .pipe(gulpResolveDependencies())
    .on('error', function (err) {
      console.error(err.message)
    })
    .pipe(gulpConcat('background.js', { newLine: ';' }))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js/'))
})

gulp.task('script:content:lint', function () {
  return gulp.src(config.sourceFolder + '/js/content/**/*.js')
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {
      breakOnError: true,
      quiet: true,
      showFilePath: true,
      showRuleNames: true
    }))
})

gulp.task('script:content:build', function () {
  return gulp.src(config.sourceFolder + '/js/content/main.js')
    .pipe(gulpResolveDependencies())
    .on('error', function (err) {
      console.error(err.message)
    })
    .pipe(gulpConcat('content.js', { newLine: ';' }))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js/'))
})

gulp.task('script:background',
  gulp.series('script:background:lint', 'script:background:build'))

gulp.task('script:content',
  gulp.series('script:content:lint', 'script:content:build'))

gulp.task('script', gulp.parallel('script:content', 'script:background'))
