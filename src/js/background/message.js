'use strict'

var browserButton = require('./browserbutton.js')
var browser = require('webextension-polyfill')

module.exports = {
  /**
   * Handles incoming messages
   *
   * @param {Object} request - Request from the content script.
   */

  messageHandler: function (request) {
    if (request.documentHasListedLinks) {
      browserButton.setBrowserBadgeText('!!!')
    } else {
      browserButton.setBrowserBadgeText('')
    }
  },

  /**
   * Add an event listener for messages
   */

  addMessageListener: function () {
    browser.runtime.onMessage.addListener(
      this.messageHandler)
  },

  /**
   * Initialize the messaging system
   */

  init: function () {
    this.addMessageListener()
  }

}
