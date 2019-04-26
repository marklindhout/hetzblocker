'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {}
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.tabs = (function () {
  return {

    /**
     * Checks all tabs for matching to a listed domain
     *
     * @requires ../common/domainlist.js
     */

    checkAllTabsForDomainListing: function () {
      browser.tabs.query({}).then(function (tabs) {
        for (var i = 0; i < tabs.length; i += 1) {
          if ( tabs[i].url && hetzblocker.common.domainlist.isUrlBlocked(tabs[i].url) ) {
            hetzblocker.background.browserbutton.setBrowserButtonState('blocked')
          }
          else {
            hetzblocker.background.browserbutton.setBrowserButtonState('success')
          }
        }
      }, function (err) {
        console.error(err)
      })
    }
  }
})()
