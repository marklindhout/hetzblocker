'use strict'

var listUtilities = require('../common/listutilities.js')
var browserButton = require('./browserbutton.js')
var browser = require('webextension-polyfill')

module.exports = {
  /**
   * Checks all tabs for matching to a listed domain
   */

  checkAllTabsForUrlListing: function () {
    browser.tabs.query({}).then(function (tabs) {
      for (var i = 0; i < tabs.length; i += 1) {
        if (tabs[i].url && listUtilities.isUrlBlocked(tabs[i].url)) {
          browserButton.setBrowserButtonState('blocked')
        } else {
          browserButton.setBrowserButtonState('success')
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
