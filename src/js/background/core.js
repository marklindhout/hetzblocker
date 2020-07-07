'use strict'

var utilities = require('./utilities.js')
var prerequisites = require('./prerequisites.js')
var request = require('./request.js')
var state = require('./state.js')
var message = require('./message.js')
var browser = require('webextension-polyfill')

module.exports = {

  /**
   * Adds event listener for the 'installed' event
   */

  addInstalledListener: function () {
    browser.runtime.onInstalled.addListener(function (details) {
      if (details.reason === 'install') {
        var locale = utilities.getSimplifiedBrowserLocale()

        browser.tabs.create({
          url: browser.extension.getURL('data/html/install-success_' + locale + '.html')
        })
          .then(function () {
            console.log(browser.i18n.getMessage('installationSuccessMessage'))
          })
      }
    })
  },

  /**
   * Initialize
   */

  init: function () {
    prerequisites.init()
    this.addInstalledListener()
    request.addRequestListener()
    state.init()
    message.init()
  }

}
