/**
 * @file Gulp tasks for cleaning temporary folders.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const gulp = require('gulp')
const del = require('del')
const config = require('../project.config')

// Clean the build and dist folders
gulp.task('clean', async function () {
  return await del([
    config.buildFolder,
    config.distFolder,
    config.coverageFolder
  ],
  {
    force: true
  })
})
