'use strict'

/* global browser */

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.core = (function () {
  return {

    /**
     * Adds event listener for the 'installed' event
     *
     * @requires ../common/config.js
     */

    addInstalledListener: function () {
      browser.runtime.onInstalled.addListener(function (details) {
        if (details.reason === 'install') {
          var locale = hetzblocker.background.utilities.getSimplifiedBrowserLocale()

          browser.tabs.create({
            url: browser.extension.getURL('data/html/install-success_' + locale + '.html')
          })

          console.log(browser.i18n.getMessage('installationSuccessMessage'))
        }
      })
    },

    /**
     * Initialize
     *
     * @requires utilities.js
     * @requires request.js
     * @requires state.js
     * @requires message.js
     */

    init: function () {
      hetzblocker.background.core.addInstalledListener()
      hetzblocker.background.request.addRequestListener()
      hetzblocker.background.state.init()
      hetzblocker.background.message.init()
    }

  }
})()
