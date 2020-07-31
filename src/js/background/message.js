'use strict'

var browserButton = require('./browserbutton.js')
var config = require('../common/config.js')
var browser = require('webextension-polyfill')

module.exports = {
  /**
   * Handles incoming messages
   *
   * @param {Object} message - Message object sent from the content script.
   * @param {Object} sender - Info on the sender page.
   */

  messageHandler: function (message, sender) {
    if (message.command && message.command === 'setBrowserButtonState') {
      if (message.data.state) {
        if (message.data.state === config.state.BLOCKED) {
          browserButton.setBrowserButtonState(config.state.BLOCKED, sender.tab.id, message)
        } else if (message.data.state === config.state.WARNING) {
          browserButton.setBrowserButtonState(config.state.WARNING, sender.tab.id, message)
        } else if (message.data.state === config.state.SUCCESS) {
          browserButton.setBrowserButtonState(config.state.SUCCESS, sender.tab.id, message)
        }
      } else {
        browserButton.setBrowserButtonState(config.state.DEFAULT, sender.tab.id, message)
      }
    }
  },

  /**
   * Add an event listener for messages
   */

  addMessageListener: function () {
    browser.runtime.onMessage.addListener(this.messageHandler)
  },

  /**
   * Initialize the messaging system
   */

  init: function () {
    this.addMessageListener()
  }

}
