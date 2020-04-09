// Required modules
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')

// Include all files within the 'gulp' folder.
const gulpDir = path.join(__dirname, 'gulp')

fs.readdirSync(gulpDir).forEach(function (file) {
  require(path.join(gulpDir, file))
})

gulp.task('buildall', gulp.series('clean',
  gulp.parallel('style', 'docs', 'font', 'html', 'icon', 'i18n', 'script',
    'template')))
gulp.task('dist', gulp.series('buildall', 'extension:lint', 'extension:build'))

// The 'default task', for when Gulp is invoked without a task name.
gulp.task('default', gulp.series('buildall', 'watch'))
