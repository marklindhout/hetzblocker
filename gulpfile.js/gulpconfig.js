const fs = require('fs')
const path = require('path')

const root = path.dirname(path.resolve('..', __dirname))
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json')))

// Set the project's important folders for re-use in tasks.
const sourceFolder = path.join(root, 'src')
const buildFolder = path.join(root, 'build', pkg.version)
const distFolder = path.join(root, 'dist', pkg.version)
const distFolderFirefox = path.join(distFolder, 'firefox')
const distFolderChrome = path.join(distFolder, 'chrome')
const extensionFolder = path.join(buildFolder, 'extension')
const extensionFolderFirefox = path.join(extensionFolder, 'firefox')
const extensionFolderChrome = path.join(extensionFolder, 'chrome')

const webExtConfigFirefox = {
  sourceDir: extensionFolderFirefox,
  artifactsDir: distFolderFirefox,
  overwriteDest: true,
  warningsAsErrors: true
}

const webExtConfigChrome = {
  sourceDir: extensionFolderChrome,
  artifactsDir: distFolderChrome,
  overwriteDest: true,
  warningsAsErrors: true
}

module.exports = {
  sourceFolder,
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
