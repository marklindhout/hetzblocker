/**
 * @file Gulp tasks for compiling and copying HTML files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpRename = require('gulp-rename')
const gulpTwig = require('gulp-twig')
const config = require('../project.config.js')

gulp.task('html:background', function () {
  return gulp.src(`${config.sourceFolder}/html/background.html.twig`)
    .pipe(
      gulpTwig({
        extname: false
      })
    )
    .pipe(gulp.dest(`${config.extensionFolderChrome}/data/html/`))
    .pipe(gulp.dest(`${config.extensionFolderFirefox}/data/html/`))
})

gulp.task('html:localized', function (cb) {
  for (const locale of config.i18n.activatedLocales) {
    gulp.src([
      `${config.sourceFolder}/html/install-success.html.twig`,
      `${config.sourceFolder}/html/block.html.twig`
    ])
      .pipe(
        gulpTwig({
          data: { ...config.i18n[locale], lang: locale },
          extname: false
        })
      )
      .pipe(gulpRename({
        suffix: `_${locale}`
      }))
      .pipe(gulp.dest(`${config.extensionFolderChrome}/data/html/`))
      .pipe(gulp.dest(`${config.extensionFolderFirefox}/data/html/`))
  }

  cb()
})

gulp.task('html', gulp.parallel('html:localized', 'html:background'))
