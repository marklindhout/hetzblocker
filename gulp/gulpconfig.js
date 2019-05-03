const fs = require('fs')

// Load the package.json for use in templates and tasks.
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

// Set the project's important folders for re-use in tasks.
const sourceFolder = './src'
const buildFolder = './build/' + pkg.version
const distFolder = './dist/' + pkg.version
const distFolderFirefox = distFolder + '/firefox'
const distFolderChrome = distFolder + '/chrome'
const extensionFolder = buildFolder + '/extension'
const extensionFolderFirefox = extensionFolder + '/firefox'
const extensionFolderChrome = extensionFolder + '/chrome'

module.exports = {
  sourceFolder,
  buildFolder,
  distFolder,
  extensionFolder,
  extensionFolderChrome,
  extensionFolderFirefox,
  distFolderFirefox,
  distFolderChrome,
  pkg
}
