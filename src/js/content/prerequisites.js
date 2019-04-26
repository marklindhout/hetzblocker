'use strict'

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.content = hetzblocker.content || {}
hetzblocker.content.prerequisites = (
  function (window) {
    /**
     * Loads the appropriate object into window.browser to allow transparent development
     * for Chrome, Edge, Opera and Firefox.
     *
     * @requires ../vendor/browser-polyfill.js
     */

    window.browser = (
      function () {
        return window.msBrowser || window.browser || window.chrome
      }
    )()
  }
)(window)
