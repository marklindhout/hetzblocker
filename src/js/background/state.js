'use strict'

var tabs = require('./tabs.js')
var browser = require('webextension-polyfill')

module.exports = {
  /**
   * Bind event listener to the tab close event, so we can see if
   * there's any blocked URL's open at this moment.
   */

  bindTabCloseEventListeners: function () {
    browser.tabs.onRemoved.addListener(function () {
      tabs.checkAllTabsForUrlListing()
    })
  },

  /**
   * Bind event listener to the navigation events we care about, so we can
   * see if there's any blocked URL's open at this moment.
   */

  bindWebNavigationEventListeners: function () {
    browser.webNavigation.onBeforeNavigate.addListener(function () {
      tabs.checkAllTabsForUrlListing()
    })
  },

  /**
   * Initializes the extension state.
   */

  init: function () {
    this.bindWebNavigationEventListeners()
    this.bindTabCloseEventListeners()
    tabs.checkAllTabsForUrlListing()
  }
}
