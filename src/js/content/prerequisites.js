module.exports = {
  /**
   * Loads the appropriate object into window.browser to allow transparent development
   * for Chrome, Edge, Opera and Firefox.
   */

  init: function () {
    window.browser = window.msBrowser || window.browser || window.chrome
  }
}
