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
const buildFolder = path.join(root, 'build')
const distFolder = path.join(root, 'dist')
const distFolderFirefox = path.join(distFolder, 'firefox')
const distFolderChrome = path.join(distFolder, 'chrome')
const extensionFolder = path.join(buildFolder, 'extension')
const extensionFolderFirefox = path.join(extensionFolder, 'firefox')
const extensionFolderChrome = path.join(extensionFolder, 'chrome')

const webExtConfigFirefox = {
  sourceDir: extensionFolderFirefox,
  artifactsDir: distFolderFirefox,
  overwriteDest: true,
  noInput: true
}

const webExtConfigChrome = {
  sourceDir: extensionFolderChrome,
  artifactsDir: distFolderChrome,
  overwriteDest: true,
  noInput: true
}

module.exports = {
  rootFolder,
  sourceFolder,
  testsFolder,
  buildFolder,
  distFolder,
  extensionFolder,
  extensionFolderChrome,
  extensionFolderFirefox,
  distFolderFirefox,
  distFolderChrome,
  webExtConfigFirefox,
  webExtConfigChrome,
  pkg
}
