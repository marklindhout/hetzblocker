const listUtilities = require('../common/listutilities.js')
const browserButton = require('./browserbutton.js')
const config = require('../common/config')
const browser = require('webextension-polyfill')

module.exports = {
  /**
   * Checks all tab URLs against the matching lists, and sets the button state to blocked if necessary.
   */

  checkAllTabsForUrlListing: function () {
    browser.tabs.query({}).then((tabs) => {
      for (let tab of tabs) {
        if (tab.url && listUtilities.isUrlBlocked(tab.url)) {
          browserButton.setBrowserButtonState(config.state.BLOCKED, tab.id)
        }
      }
    }, function (err) {
      console.error(err)
    })
  }
}
