'use strict'

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.common = hetzblocker.common || {}
hetzblocker.common.listutilities = (function () {
  return {

    /**
     * Returns an Array of Strings with all listed domains.
     *
     * @returns {string[]}
     *
     * @requires pagelist.js
     */

    getListedPages: function () {
      return hetzblocker.common.pagelist.list
    },

    /**
     * Returns an Array of Strings with all listed domains.
     *
     * @returns {string[]}
     *
     * @requires domainlist.js
     */

    getListedDomains: function () {
      return hetzblocker.common.domainlist.list
    },

    /**
     * Checks the given url against the central domain list.
     *
     * @param {String} url - A URL, which should at least contain a domain.
     * @returns {Boolean} Blocked status
     *
     * @requires ../vendor/uri.js
     */

    isDomainBlocked: function (url) {
      var domain = new URI(url).domain() // eslint-disable-line no-undef
      var list = hetzblocker.common.listutilities.getListedDomains()
      var i = list.length - 1

      while (i >= 0) {
        if (list[i] === domain) {
          return true
        }

        i -= 1
      }

      return false
    },

    /**
     * Checks the given url against the central page list.
     *
     * @param {String} url - A full URL
     * @returns {Boolean} Blocked status
     *
     * @requires ../vendor/uri.js
     */

    isPageBlocked: function (url) {
      var uri = new URI(url).normalize() // eslint-disable-line no-undef
      var list = hetzblocker.common.listutilities.getListedPages()
      var i = list.length - 1

      while (i >= 0) {
        var listing = new URI(list[i]).normalize()
        var uriPath = uri.pathname().toLowerCase()
        var listingPath = listing.pathname().toLowerCase()

        if (listing.domain() === uri.domain()) {
          if (uriPath.startsWith(listingPath)) {
            return true
          }
        }

        i -= 1
      }

      return false
    },

    /**
     * Checks the given url against the domain list and page lists.
     *
     * @param {String} url - A full URL
     * @returns {Boolean} Blocked status
     */

    isUrlBlocked: function (url) {
      var db = hetzblocker.common.listutilities.isDomainBlocked(url)
      var pb = hetzblocker.common.listutilities.isPageBlocked(url)

      if (db || pb) {
        console.log(browser.i18n.getMessage('urlWasBlockedConsoleMessage', url)) // eslint-disable-line no-undef
        return true
      } else {
        return false
      }
    }
  }
})()
