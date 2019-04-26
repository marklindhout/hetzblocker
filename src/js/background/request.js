'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {}
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.request = (function () {
  return {

    /**
     * Listener for the navigation event
     */

    addRequestListener: function () {
      browser.webRequest.onBeforeRequest.addListener(
        hetzblocker.background.request.checkDomainListingStatus, { urls: ['<all_urls>'] }, ['blocking'])
    },

    /**
     * Check a domain's listing status
     *
     * @param {String} details - The request details object.
     *
     * @requires ../common/domainlist.js
     * @requires utilities.js
     * @requires browserbutton.js
     */

    checkDomainListingStatus: function (details) {
      var url = details.url

      if (hetzblocker.common.domainlist.isUrlBlocked(url)) {
        console.log(browser.i18n.getMessage('urlWasBlockedConsoleMessage', url))
        hetzblocker.background.browserbutton.setBrowserButtonState('blocked')

        return hetzblocker.background.request.redirectToBlockMessagePage()
      }
    },

    /**
     * Redirection to the blocked message page
     *
     * @requires utilities.js
     */

    redirectToBlockMessagePage: function () {
      var locale = hetzblocker.background.utilities.getSimplifiedBrowserLocale()
      var blockMessageUrl = browser.extension.getURL(
        'data/html/block_' + locale + '.html')

      return {
        redirectUrl: blockMessageUrl
      }
    }

  }
})()
