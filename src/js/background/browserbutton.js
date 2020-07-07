'use strict'

var browser = require('webextension-polyfill')

module.exports = {

  /**
   * Verifies the passed string against a whitelist of possible states.
   *
   * @param {String} state - Extension state: blocked, warning, success, or default.
   */

  isValidState: function (state) {
    var allowedStates = [
      'blocked',
      'warning',
      'success',
      'default'
    ]

    for (var i = 0; i < allowedStates.length; i += 1) {
      if (state === allowedStates[i]) {
        return true
      }
    }

    return false
  },

  /**
   *
   * @param {String} state - Extension state
   *
   * @returns {String} - The normalized extension state
   */

  normalizeStateArg: function (state) {
    if (this.isValidState(state)) {
      return state
    }

    return 'default'
  },

  /**
   * Set the badge text on the browser action button
   *
   * @param {String} text - The badge text
   *
   */

  setBrowserBadgeText: function (text) {
    browser.browserAction.setBadgeBackgroundColor({ color: '#ff0000' })
    browser.browserAction.setBadgeText({ text: text })
  },

  /**
   * Set the title text on the browser action button
   *
   * @param {String} state - Extension state: blocked, warning, success, or default.
   *
   */

  setBrowserButtonTitle: function (state) {
    var ns = this.normalizeStateArg(state)

    browser.browserAction.setTitle({
      title: browser.i18n.getMessage('extensionName') + ' — ' +
        browser.i18n.getMessage(
          'browserButtonMessageState_' + ns)
    })
  },

  /**
   * Set the icon on the browser action button
   *
   * @param {String} state - Extension state: blocked, warning, success, or default.
   */

  setBrowserButtonIcon: function (state) {
    var ns = this.normalizeStateArg(state)

    var paths = {
      '512': browser.extension.getURL(
        'data/icon/icon_' + ns + '_512.png'),
      '256': browser.extension.getURL(
        'data/icon/icon_' + ns + '_256.png'),
      '128': browser.extension.getURL(
        'data/icon/icon_' + ns + '_128.png'),
      '96': browser.extension.getURL(
        'data/icon/icon_' + ns + '_96.png'),
      '64': browser.extension.getURL(
        'data/icon/icon_' + ns + '_64.png'),
      '48': browser.extension.getURL(
        'data/icon/icon_' + ns + '_48.png'),
      '32': browser.extension.getURL(
        'data/icon/icon_' + ns + '_32.png'),
      '24': browser.extension.getURL(
        'data/icon/icon_' + ns + '_24.png'),
      '19': browser.extension.getURL(
        'data/icon/icon_' + ns + '_19.png'),
      '16': browser.extension.getURL(
        'data/icon/icon_' + ns + '_16.png')
    }

    browser.browserAction.setIcon({
      path: paths
    })
  },

  /**
   * Set the state of the browser action button,
   * affecting icon and text label.
   *
   * @param {String} state - Extension state: blocked, warning, success, or default.
   */

  setBrowserButtonState: function (state) {
    this.setBrowserButtonIcon(state)
    this.setBrowserButtonTitle(state)
  }

}
