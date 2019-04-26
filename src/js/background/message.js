'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {}
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.message = (
  function () {
    return {

      /**
       * Handles incoming messages
       *
       * @param {Object} request - Request from the content script.
       *
       * @requires browserbutton.js
       */

      messageHandler: function (request) {
        if (request.documentHasListedLinks) {
          hetzblocker.background.browserbutton.setBrowserBadgeText('!!!')
        } else {
          hetzblocker.background.browserbutton.setBrowserBadgeText('')
        }
      },

      /**
       * Add an event listener for messages
       */

      addMessageListener: function () {
        browser.runtime.onMessage.addListener(
          hetzblocker.background.message.messageHandler)
      },

      /**
       * Initialize the messaging system
       */

      init: function () {
        hetzblocker.background.message.addMessageListener()
      }

    }
  }
)()
