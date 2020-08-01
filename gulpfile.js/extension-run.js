/**
 * @file Gulp tasks for running the extension using `web-ext`.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const webExt = require('web-ext')
const config = require('../project.config.js')

gulp.task('extension:run:chrome', function () {
  const runConfig = {
    target: ['chromium'],
    chromiumBinary: '/usr/bin/google-chrome',
    browserConsole: true,
    reload: true
  }

  return webExt.cmd.run({ ...config.webExtConfigChrome, ...runConfig }, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:run:firefox', function () {
  const runConfig = {
    target: ['firefox-desktop'],
    firefoxBinary: '/usr/bin/firefox',
    browserConsole: true,
    reload: true
  }

  return webExt.cmd.run({ ...config.webExtConfigFirefox, ...runConfig }, {
    shouldExitProgram: false
  })
    .catch(err => console.error(err))
})

gulp.task('extension:run', gulp.parallel('extension:run:firefox', 'extension:run:chrome'))
