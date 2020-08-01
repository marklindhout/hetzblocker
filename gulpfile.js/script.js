/**
 * @file Gulp tasks for combining, transpiling, testing, and uglifying JavaScript files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const browserify = require('browserify')
const gulpBabel = require('gulp-babel');
const gulpBuffer = require('gulp-buffer')
const gulpLog = require('fancy-log')
const gulpRename = require('gulp-rename')
const gulpStandard = require('gulp-standard')
const gulpTap = require('gulp-tap')
const gulpUglify = require('gulp-uglify')
const config = require('../project.config.js')

gulp.task('script:extensionPage_block:lint', function () {
  return gulp.src(config.sourceFolder + '/js/extensionPage/block.js')
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {
      breakOnError: true,
      quiet: true,
      showFilePath: true,
      showRuleNames: true
    }))
})

gulp.task('script:extensionPage_block:build', function () {
  return gulp.src(config.sourceFolder + '/js/extensionPage/block.js', { read: false })
    .pipe(gulpTap(function (file) {
      gulpLog.info('Bundling: ' + file.path)
      file.contents = browserify(file.path, { debug: true }).bundle()
    }))
    .pipe(gulpBuffer())
    .pipe(gulpBabel({
      presets: ['@babel/env']
    }))
    .pipe(gulpRename('extensionPage_block.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js'))
})

gulp.task('script:background:lint', function () {
  return gulp.src(config.sourceFolder + '/js/background/**/*.js')
    .pipe(gulpStandard())
    .pipe(gulpStandard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('script:background:build', function () {
  return gulp.src(config.sourceFolder + '/js/background/main.js', { read: false })
    .pipe(gulpTap(function (file) {
      gulpLog.info('Bundling: ' + file.path)
      file.contents = browserify(file.path, { debug: true }).bundle()
    }))
    .pipe(gulpBuffer())
    .pipe(gulpBabel({
      presets: ['@babel/env']
    }))
    .pipe(gulpRename('background.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js'))
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
  return gulp.src(config.sourceFolder + '/js/content/main.js', { read: false })
    .pipe(gulpTap(function (file) {
      gulpLog.info('Bundling: ' + file.path)
      file.contents = browserify(file.path, { debug: true }).bundle()
    }))
    .pipe(gulpBuffer())
    .pipe(gulpBabel({
      presets: ['@babel/env']
    }))
    .pipe(gulpRename('content.js'))
    .pipe(gulpUglify())
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/js'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/js'))
})

gulp.task('script:extensionPage_block',
  gulp.series('script:extensionPage_block:lint', 'script:extensionPage_block:build'))

gulp.task('script:background',
  gulp.series('script:background:lint', 'script:background:build'))

gulp.task('script:content',
  gulp.series('script:content:lint', 'script:content:build'))

gulp.task('script', gulp.parallel('script:content', 'script:background', 'script:extensionPage_block'))
