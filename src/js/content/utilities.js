'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {}
hetzblocker.content = hetzblocker.content || {}
hetzblocker.content.utilities = (function (window) {
  return {
    /**
     * Lets us know when the DOM is ready.
     *
     * Taken from: http://javascript.nwbox.com/ContentLoaded/
     *
     * @param {Function} fn - Callback function to execute when the DOM becomes ready.
     *
     * */

    domReady: function (fn) {
      var done = false
      var top = true

      var d = document
      var root = d.documentElement
      var modern = d.addEventListener

      var add = modern ? 'addEventListener' : 'attachEvent'
      var rem = modern ? 'removeEventListener' : 'detachEvent'
      var pre = modern ? '' : 'on'

      var initialize = function (e) {
        if (e.type === 'readystatechange' && d.readyState !== 'complete') {
          return
        }
        (e.type === 'load' ? window : d)[rem](pre + e.type, initialize, false)
        if (!done && (done = true)) {
          fn.call(window, e.type || e)
        }
      }

      var poll = function () {
        try {
          root.doScroll('left')
        } catch (e) {
          setTimeout(poll, 50)
          return
        }
        initialize('poll')
      }

      if (d.readyState === 'complete') {
        fn.call(window, 'lazy')
      } else {
        if (!modern && root.doScroll) {
          try {
            top = !window.frameElement
          } catch (e) {
          }
          if (top) {
            poll()
          }
        }

        d[add](pre + 'DOMContentLoaded', initialize, false)
        d[add](pre + 'readystatechange', initialize, false)
        window[add](pre + 'load', initialize, false)
      }
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
})(window)
