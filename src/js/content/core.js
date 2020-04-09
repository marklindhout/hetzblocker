'use strict'

/** @requires ../common/config.js */
/** @requires prerequisites.js */

var hetzblocker = hetzblocker || {} // eslint-disable-line no-use-before-define
hetzblocker.content = hetzblocker.content || {}
hetzblocker.content.core = (
  function (window) {
    return {

      /**
       * Adds class so the element is clearly labeled as being a listed domain.
       *
       * @param {HTMLElement} element
       */

      addListedClassToElement: function (element) {
        element.classList.add('hetzblocker__ListedLink')
      },

      /**
       * Sets the element's 'href' attribute to '#'
       *
       * @param {HTMLElement} element
       */

      disableHrefAttribute: function (element) {
        element.removeAttribute('href')
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
       *
       * @requires ../common/listutilities.js
       */

      scanAllLinks: function () {
        var allLinksInDocument = window.document.querySelectorAll('a')
        var i = 0

        for (i; i < allLinksInDocument.length; i += 1) {
          var currentLink = allLinksInDocument[i]

          if (currentLink.href) {
            if (hetzblocker.common.listutilities.isUrlBlocked(
              currentLink.href)) {
              hetzblocker.content.core.addListedClassToElement(currentLink)
              hetzblocker.content.core.disableHrefAttribute(currentLink)
              hetzblocker.content.core.removeAllEventListeners(currentLink)
            }
          }
        }
      },

      /**
       * Watches the document DOM element for mutations, and triggers the given'
       * function when that happens.
       *
       * @param {Function} fn - This callback is triggered when mutation occurs.
       */

      documentMutationObserver: function (fn) {
        var observer = new MutationObserver(fn) // eslint-disable-line no-undef

        observer.observe(window.document, {
          subtree: true,
          childList: true
        })
      },

      /**
       * Initialize
       */

      init: function () {
        hetzblocker.content.core.documentMutationObserver(function () {
          hetzblocker.content.core.scanAllLinks()
        })

        hetzblocker.content.core.scanAllLinks()
      }

    }
  }
)(window)
