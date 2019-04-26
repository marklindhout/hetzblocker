'use strict'

/**
 * Returns a config object for the extension.
 *
 * @returns: {Object} A configuration object
 */

var hetzblocker = hetzblocker || {}
hetzblocker.common = hetzblocker.common || {}

hetzblocker.common.config = (
  function () {
    return {
      defaultLocale: 'en'
    }
  }
)()
