'use strict'

var pageList = require('./pagelist.js')
var domainList = require('./domainlist.js')
var utilities = require('./utilities.js')
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
   * Converts a given URL string to a domain name consisting of the domain, a dot, and the TLD>
   *
   * @param {String} url - the URL to extract a domain name from.
   * @returns {String}
   */

  normalizeToDomain: function (url) {
    if (!url) { throw new Error('No URL string specified.') }

    let domain = new URI(url).domain()

    if (!domain) {
      domain = new URI({ protocol: 'http', hostname: url }).domain()
    }

    return domain
  },

  /**
   * Checks the given domain name against the central domain list.
   *
   * @param {String} url - A full URL to check against the domain block list.
   * @returns {Boolean} Blocked status
   */

  isDomainBlocked: function (url) {
    if (!url) { throw new Error('No URL string specified.') }

    const domain = this.normalizeToDomain(url)
    const list = this.getListedDomains()

    for (let entry of list) {
      if (entry === domain) {
        return true
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
    if (!url) { throw new Error('No URL string specified.') }

    var currentUri = new URI(utilities.stripTrailingSlash(url))
    var list = this.getListedPages()

    for (let entry of list) {
      var listingUri = new URI(utilities.stripTrailingSlash(entry))

      if (currentUri.subdomain() === listingUri.subdomain() &&
        currentUri.domain() === listingUri.domain() &&
        currentUri.pathname() === listingUri.pathname()) {
        return true
      }
    }

    return false
  },

  /**
   * Returns a block reason key retrieved from the relevant entry in the domain list.
   *
   * @param url {String}
   * @returns {String} - Block reason key
   */

  retrieveBlockReasonForDomain: function (url) {
    const domain = this.normalizeToDomain(url)
    const list = this.getListedDomains()

    for (let entry of list) {
      if (entry === domain) {
        return entry.reason || 'domain_block_explanatory_reason_string'
      }
    }

    return null
  },

  /**
   * Returns a block reason key retrieved from the relevant entry in the domain list.
   *
   * @param url {String}
   * @returns {String} - Block reason key
   */

  retrieveBlockReasonForPage: function (url) {
    var currentUri = new URI(utilities.stripTrailingSlash(url))
    var list = this.getListedPages()

    for (let entry of list) {
      var listingUri = new URI(utilities.stripTrailingSlash(entry))

      if (currentUri.subdomain() === listingUri.subdomain() &&
        currentUri.domain() === listingUri.domain() &&
        currentUri.pathname() === listingUri.pathname()) {
        return entry.reason || 'page_block_explanatory_reason_string'
      }
    }

    return null
  },

  /**
   * Returns a reason, retrieved from the relevant entry, as to why this URL is blocked.
   *
   * @param url {String}
   */

  retrieveBlockReasonForUrl: function (url) {
    if (!url) { throw new Error('No URL string specified.') }

    if (this.isDomainBlocked(url)) {
      return this.retrieveBlockReasonForDomain(url)
    } else if (this.isPageBlocked(url)) {
      return this.retrieveBlockReasonForPage(url)
    }

    return null
  },

  /**
   * Checks the given url against the domain list and page lists.
   *
   * @param {String} url - A full URL.
   * @returns {Boolean} Blocked status
   */

  isUrlBlocked: function (url) {
    if (!url) { throw new Error('No URL string specified.') }

    const db = this.isDomainBlocked(url)
    const pb = this.isPageBlocked(url)

    return db || pb
  }
}
