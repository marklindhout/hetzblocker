'use strict'

const prerequisites = require('./prerequisites.js')
const listUtilities = require('../common/listutilities.js')
const config = require('../common/config.js')

module.exports = {

  /**
   * Adds class so the element is clearly labeled as being a listed domain.
   *
   * @param {HTMLElement} element
   */

  addListedClassToElement: function (element) {
    element.classList.add(config.listedLinkClassName)
  },

  /**
   * Removes all element attributes.
   *
   * @param {HTMLElement} element
   */

  removeAllAttributes: function (element) {
    var attrs = element.getAttributeNames()
    var i = 0

    for (i; i < attrs.length; i += 1) {
      element.removeAttribute(attrs[i])
    }
  },

  /**
   * Remove all event listeners on the element, by re-inserting
   * a cloned version of the node into the DOM, which doesn't
   * have these event listeners attached.
   *
   * @param {HTMLElement} element
   */

  removeAllEventListeners: function (element) {
    var clone = element.cloneNode(true)

    element.parentNode.replaceChild(clone, element)
  },

  /**
   * Scans all links within a page for a match to the domain list.
   */

  scanAllLinks: function () {
    var allLinksInDocument = document.querySelectorAll('a')
    var i = 0

    for (i; i < allLinksInDocument.length; i += 1) {
      var currentLink = allLinksInDocument[i]

      if (currentLink.href) {
        if (listUtilities.isUrlBlocked(currentLink.href)) {
          this.removeAllAttributes(currentLink)
          this.addListedClassToElement(currentLink)
          this.removeAllEventListeners(currentLink)
        }
      }
    }
  },

  /**
   * Watches the document DOM element for mutations, and triggers the given
   * function when that happens.
   *
   * @param {Function} fn - This callback is triggered when mutation occurs.
   */

  bindDocumentMutationObserver: function (fn) {
    const observer = new MutationObserver(fn) // eslint-disable-line no-undef

    observer.observe(document, {
      subtree: true,
      childList: true
    })
  },

  /**
   * Initialize
   */

  init: function () {
    prerequisites.init()
    this.bindDocumentMutationObserver(this.scanAllLinks.bind(this))
    this.scanAllLinks()
  }
}
