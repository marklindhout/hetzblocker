/**
 * @file Gulp tasks for building, testing, and distributing the extension.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const fs = require('fs')
const path = require('path')
const gulp = require('gulp')

fs.readdirSync(__dirname).forEach(function (file) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    const taskModulePath = path.join(__dirname, file)
    require(taskModulePath)
  }
})

gulp.task(
  'buildall',
  gulp.series(
    'clean',
    gulp.parallel(
      'style',
      'docs',
      'font',
      'html',
      'icon',
      'i18n',
      'template',
      gulp.series(
        'test',
        'script'
      )
    )
  )
)

gulp.task(
  'dist',
  gulp.series(
    'buildall',
    'extension:lint',
    'extension:build'
  )
)

// The 'default task', for when Gulp is invoked without a task name.
gulp.task(
  'default',
  gulp.series(
    'buildall',
    'watch'
  )
)
