'use strict'

var pageList = require('./pagelist.js')
var domainList = require('./domainlist.js')
var browser = require('webextension-polyfill')
var URI = require('urijs')

module.exports = {
  /**
   * Returns an Array of Strings with all blocked domains.
   *
   * @returns {string[]}
   */

  getListedPages: function () {
    return pageList.blocked
  },

  /**
   * Returns an Array of Strings with all blocked domains.
   *
   * @returns {string[]}
   */

  getListedDomains: function () {
    return domainList.blocked
  },

  /**
   * Checks the given url against the central domain list.
   *
   * @param {String} url - A URL, which should at least contain a domain.
   * @returns {Boolean} Blocked status
   */

  isDomainBlocked: function (url) {
    let domain = new URI(url).domain()
    var list = this.getListedDomains()
    var i = list.length - 1

    if (!domain) {
      domain = new URI({
        protocol: 'http',
        hostname: url
      })
        .domain()
    }

    if (domain) {
      while (i >= 0) {
        if (list[i] === domain) {
          return true
        }

        i -= 1
      }
    }

    return false
  },

  /**
   * Checks the given url against the central page list.
   *
   * @param {String} url - A full URL
   * @returns {Boolean} Blocked status
   */

  isPageBlocked: function (url) {
    var uri = new URI(url).normalize()
    var list = this.getListedPages()
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
    var db = this.isDomainBlocked(url)
    var pb = this.isPageBlocked(url)

    if (db || pb) {
      console.log(browser.i18n.getMessage('urlWasBlockedConsoleMessage', url))
      return true
    } else {
      return false
    }
  }
}
