// Required modules
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')

fs.readdirSync(__dirname).forEach(function (file) {
  require(path.join(__dirname, file))
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
      'script',
      'template'
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
