'use strict'

/**
 * Returns a config object for the extension.
 *
 * @returns: {Object} A configuration object
 */

module.exports = {
  defaultLocale: 'en',
  listedLinkClassName: 'hetzblocker__ListedLink',
  state: {
    WARNING: 'warning',
    BLOCKED: 'blocked',
    DEFAULT: 'default',
    SUCCESS: 'success'
  }
}
