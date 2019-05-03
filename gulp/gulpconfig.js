const fs = require('fs')
const path = require('path')

// Load the package.json for use in templates and tasks.
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const projectRootDir = path.dirname(__dirname)

// Set the project's important folders for re-use in tasks.
const sourceFolder = projectRootDir + '/src'
const buildFolder = projectRootDir + '/build/' + pkg.version
const distFolder = projectRootDir + '/dist/' + pkg.version
const distFolderFirefox = distFolder + '/firefox'
const distFolderChrome = distFolder + '/chrome'
const extensionFolder = buildFolder + '/extension'
const extensionFolderFirefox = extensionFolder + '/firefox'
const extensionFolderChrome = extensionFolder + '/chrome'

const webExtConfigFirefox = {
  sourceDir: extensionFolderFirefox,
  artifactsDir: distFolderFirefox,
  overwriteDest: true
}

const webExtConfigChrome = {
  sourceDir: extensionFolderChrome,
  artifactsDir: distFolderChrome,
  overwriteDest: true
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
