'use strict'

var utilities = require('./utilities.js')
var browserButton = require('./browserbutton.js')
var listUtilities = require('../common/listutilities.js')
var browser = require('webextension-polyfill')

module.exports = {
  /**
   * Listener for the navigation event
   */

  addRequestListener: function () {
    browser.webRequest.onBeforeRequest.addListener(
      this.checkUrlListingStatus.bind(this), { urls: ['<all_urls>'] }, ['blocking'])
  },

  /**
   * Check a domain's listing status
   *
   * @param {String} details - The request details object.
   */

  checkUrlListingStatus: function (details) {
    var url = details.url

    if (listUtilities.isUrlBlocked(url)) {
      browserButton.setBrowserButtonState('blocked')
      return this.redirectToBlockMessagePage()
    }
  },

  /**
   * Redirection to the blocked message page
   */

  redirectToBlockMessagePage: function () {
    var locale = utilities.getSimplifiedBrowserLocale()
    var blockMessageUrl = browser.extension.getURL(
      'data/html/block_' + locale + '.html')

    return {
      redirectUrl: blockMessageUrl
    }
  }

}
