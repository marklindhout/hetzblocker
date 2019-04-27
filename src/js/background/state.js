'use strict'

/* global browser */

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.state = (function () {
  return {
    /**
     * Bind event listener to the tab close event, so we can see if
     * there's any blocked URL's open at this moment.
     *
     * @requires tabs.js
     */

    bindTabCloseEventListeners: function () {
      browser.tabs.onRemoved.addListener(function () {
        hetzblocker.background.tabs.checkAllTabsForUrlListing()
      })
    },

    /**
     * Bind event listener to the navigation events we care about, so we can
     * see if there's any blocked URL's open at this moment.
     *
     * @requires tabs.js
     */

    bindWebNavigationEventListeners: function () {
      browser.webNavigation.onBeforeNavigate.addListener(function () {
        hetzblocker.background.tabs.checkAllTabsForUrlListing()
      })
    },

    /**
     * Initializes the extension state.
     *
     * @requires tabs.js
     */

    init: function () {
      hetzblocker.background.state.bindWebNavigationEventListeners()
      hetzblocker.background.state.bindTabCloseEventListeners()
      hetzblocker.background.tabs.checkAllTabsForUrlListing()
    }
  }
})()
