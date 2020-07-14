/**
 * @file Jest configuration for testing for the Hetzblocker browser extension.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const config = require('./project.config.js')

module.exports = {
  automock: false,
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: `${config.rootFolder}/coverage`,
  coveragePathIgnorePatterns: [
    `${config.rootFolder}/gulpfile.js`,
    `${config.rootFolder}/node_modules`,
    `${config.buildFolder}`,
    `${config.distFolder}`,
  ],
  // coverageProvider: 'babel',
  coverageReporters: ['text', 'lcov'],
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
}
