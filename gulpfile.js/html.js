/**
 * @file Gulp tasks for compiling and copying HTML files.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
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
  for (let locale of config.i18n.activatedLocales) {
    const i18nJSON = require(`../src/i18n/${locale}/messages.json`)

    gulp.src(`${config.sourceFolder}/html/*_${locale}.html.twig`)
      .pipe(
        gulpTwig({
          data: i18nJSON,
          extname: false
        })
      )
      .pipe(gulp.dest(`${config.extensionFolderChrome}/data/html/`))
      .pipe(gulp.dest(`${config.extensionFolderFirefox}/data/html/`))
  }

  cb()
})

gulp.task('html', gulp.parallel('html:localized', 'html:background'))
