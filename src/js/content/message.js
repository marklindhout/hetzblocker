module.exports = {
  /**
   * Sends a message to the extension's background HTML page, for further processing.
   *
   * @param message {Object}
   */

  send: function (message) {
    // eslint-disable-next-line no-undef
    browser.runtime.sendMessage(message)
  }

}
