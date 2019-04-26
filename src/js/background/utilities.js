'use strict'

/* global browser */

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.background = hetzblocker.background || {}
hetzblocker.background.utilities = (function () {
  return {
    /**
     * Returns only the two-letter language locale or config.defaultLocale
     *
     * @requires ../common/config.js
     */

    getSimplifiedBrowserLocale: function () {
      var defaultLocale = hetzblocker.common.config.defaultLocale
      var currentLocale = browser.i18n.getUILanguage()
      var returnLocale = ''

      if (!currentLocale || currentLocale === 'und') {
        returnLocale = defaultLocale
      } else {
        returnLocale = currentLocale
      }

      return returnLocale.split('-')[0]
    },

    /**
     * Check if a given object is empty or an object with empty values.
     *
     * @returns {Boolean} Indicating if the passed argument is empty.
     */

    isObjectEmpty: function (obj) {
      if (typeof obj !== 'object') {
        throw new Error('Provided argument is not an object')
      }

      if (obj.length > 0) {
        return false
      }

      if (obj.length === 0) {
        return true
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          return false
        }
      }

      return true
    }
  }
})()
