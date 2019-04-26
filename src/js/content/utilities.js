'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.content = hetzblocker.content || {}
hetzblocker.content.utilities = (function (window) {
  return {
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
})(window)
