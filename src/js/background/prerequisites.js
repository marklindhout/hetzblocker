'use strict'

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.prerequisites = (
  function () {
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
)()
