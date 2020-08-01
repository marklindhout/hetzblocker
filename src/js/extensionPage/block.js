const config = require('../common/config.js')
const browserButton = require('../background/browserbutton')
const browser = require('webextension-polyfill')

const hetzblocker = {

  /**
   * Retrieves and returns the specified query variable for the current window's URL.
   *
   * @param {String} variableName - The name of the variable to retrieve.
   * @returns {String|null}
   */

  retrieveQueryVariable: function (variableName) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    return urlParams.get(variableName) || null
  },

  /**
   * Sets the inner text node of the given DOM element to the provided value.
   *
   * @param elementID {String} - The DOM element ID of the element to place text inside of.
   * @param queryVarName {String} - The name of the query variable value to place.
   */

  setElementWithQueryVariable: function (elementID, queryVarName) {
    const el = document.getElementById(elementID)
    const value = hetzblocker.retrieveQueryVariable(queryVarName)

    el.innerText = value || ''
  },

  /**
   * Set the browser action button to match the blocked state reflected in this page.
   */

  setBrowserButtonToBlock: function () {
    browser.tabs.getCurrent().then((tab) => {
      browserButton.setBrowserButtonState(config.state.BLOCKED, tab.id)
    })
  },

  /**
   * Populate the targeted elements with the query variable data.
   */

  fillOutDynamicInfo: function () {
    hetzblocker.setElementWithQueryVariable('blockUrl', 'blockUrl')
    hetzblocker.setElementWithQueryVariable('blockReason', 'blockReason')
  },

  /**
   * Initialization
   */

  init: function () {
    hetzblocker.setBrowserButtonToBlock()
    hetzblocker.fillOutDynamicInfo()
  }
}

// Automatic function call
hetzblocker.init()
