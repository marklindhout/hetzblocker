/**
 * @file Configuration for building, distributing, and testing the browser extension.
 * @author Mark Lindhout <hetzblocker@marklindhout.com>
 */

const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname)
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json')))

// Set the project's important folders for re-use in tasks.
const rootFolder = root
const sourceFolder = path.join(root, 'src')
const testsFolder = path.join(root, '__tests__')
const coverageFolder = path.join(root, 'coverage')
const buildFolder = path.join(root, 'build')
const distFolder = path.join(root, 'dist')
const distFolderFirefox = path.join(distFolder, 'firefox')
const distFolderChrome = path.join(distFolder, 'chrome')
const extensionFolder = path.join(buildFolder, 'extension')
const extensionFolderFirefox = path.join(extensionFolder, 'firefox')
const extensionFolderChrome = path.join(extensionFolder, 'chrome')

/**
 * WebExt Configuration: Firefox
 */

const webExtConfigFirefox = {
  sourceDir: extensionFolderFirefox,
  artifactsDir: distFolderFirefox,
  overwriteDest: true,
  noInput: true
}

/**
 * WebExt Configuration: Chrome
 */

const webExtConfigChrome = {
  sourceDir: extensionFolderChrome,
  artifactsDir: distFolderChrome,
  overwriteDest: true,
  noInput: true
}

/**
 * i18n Configuration
 */

const i18n = {
  activatedLocales: [
    'en',
    'de',
    'nl'
  ]
}

/**
 * i18n: Transform translations to easily-accessible plain strings, extracted from the `message` property.
 */

for (const locale of i18n.activatedLocales) {
  const jsonLocale = require(`./src/i18n/${locale}/messages.json`)
  const keys = Object.keys(jsonLocale)

  keys.forEach((key, index) => {
    i18n[locale] = i18n[locale] || {}
    i18n[locale][key] = jsonLocale[key].message
  })
}

/**
 * Export data
 */

module.exports = {
  rootFolder,
  sourceFolder,
  testsFolder,
  coverageFolder,
  buildFolder,
  distFolder,
  extensionFolder,
  extensionFolderChrome,
  extensionFolderFirefox,
  distFolderFirefox,
  distFolderChrome,
  webExtConfigFirefox,
  webExtConfigChrome,
  i18n,
  pkg
}
