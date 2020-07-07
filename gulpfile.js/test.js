const gulp = require('gulp')
const gulpJest = require('gulp-jest').default
const gulpLog = require('fancy-log')
const config = require('./gulpconfig.js')

gulp.task('test:js', function (cb) {
  process.env.NODE_ENV = 'test'

  gulp.src(`${config.testsFolder}`)
    .pipe(gulpJest({

      automock: false,
      bail: 0,
      clearMocks: true,
      collectCoverage: false,
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: [
        `${config.rootFolder}/gulpfile.js`,
        `${config.rootFolder}/node_modules`,
        `${config.buildFolder}`,
        `${config.distFolder}`,
      ],
      coverageReporters: [
        'text',
      ],
      rootDir: `${config.rootFolder}`,
      testEnvironment: 'jsdom',
      testMatch: [
        `${config.testsFolder}/**/*.js`
      ],
      testPathIgnorePatterns: [
        `${config.rootFolder}/gulpfile.js`,
        `${config.rootFolder}/node_modules`,
        `${config.buildFolder}`,
        `${config.distFolder}`,
        `${config.sourceFolder}/js/vendor/`
      ],
      setupFiles: [
        'jest-webextension-mock'
      ]
    }))
    .on('error', function (err) {
      gulpLog.error(err.message)
    })

  cb()
})

gulp.task('test', gulp.parallel('test:js'))
