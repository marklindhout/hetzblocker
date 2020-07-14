/**
 * @file Gulp tasks for generating and resizing icons.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const gulpResponsive = require('gulp-responsive')
const config = require('../project.config.js')

gulp.task('icon', function () {
  return gulp.src(config.sourceFolder + '/icon/**/*')
    .pipe(gulpResponsive({
      '*': [
        {
          width: 512,
          format: 'png',
          rename: { suffix: '_512' }
        },
        {
          width: 256,
          format: 'png',
          rename: { suffix: '_256' }
        },
        {
          width: 128,
          format: 'png',
          rename: { suffix: '_128' }
        },
        {
          width: 96,
          format: 'png',
          rename: { suffix: '_96' }
        },
        {
          width: 64,
          format: 'png',
          rename: { suffix: '_64' }
        },
        {
          width: 48,
          format: 'png',
          rename: { suffix: '_48' }
        },
        {
          width: 32,
          format: 'png',
          rename: { suffix: '_32' }
        },
        {
          width: 24,
          format: 'png',
          rename: { suffix: '_24' }
        },
        {
          width: 19,
          format: 'png',
          rename: { suffix: '_19' }
        },
        {
          width: 16,
          format: 'png',
          rename: { suffix: '_16' }
        }
      ]
    }, {
      compressionLevel: 9
    }))
    .pipe(gulp.dest(config.extensionFolderFirefox + '/data/icon/'))
    .pipe(gulp.dest(config.extensionFolderChrome + '/data/icon/'))
})
