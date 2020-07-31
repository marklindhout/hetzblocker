'use strict'

const utilities = require('./utilities.js')
const browserButton = require('./browserbutton.js')
const listUtilities = require('../common/listutilities.js')
const config = require('../common/config.js')
const browser = require('webextension-polyfill')

module.exports = {
  /**
   * Listener for the navigation event
   */

  addRequestListener: function () {
    browser.webRequest.onBeforeRequest.addListener(this.checkUrlListingStatus.bind(this), { urls: ['<all_urls>'] }, ['blocking'])
  },

  /**
   * Check a domain's listing status
   *
   * @param {Object} details - The request details object.
   */

  checkUrlListingStatus: function (details) {
    if (listUtilities.isUrlBlocked(details.url)) {
      browserButton.setBrowserButtonState(config.state.BLOCKED, details.tabId)
      return this.redirectToBlockMessagePage(details)
    }
  },

  /**
   * Redirection to the blocked message page
   *
   * @param {Object} details - Request details object.
   */

  redirectToBlockMessagePage: function (details) {
    const locale = utilities.getSimplifiedBrowserLocale()
    const blockMessageUrl = browser.extension.getURL(
      'data/html/block_' + locale + '.html')
    let blockUrl = ''
    let blockReason = ''

    if (details && details.url) {
      blockUrl = details.url
      blockReason = listUtilities.retrieveBlockReasonForUrl(details.url)
    }

    return {
      redirectUrl: `${blockMessageUrl}?blockUrl=${blockUrl}&blockReason=${blockReason}`
    }
  }

}
