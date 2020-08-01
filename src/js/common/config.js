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
    WARNING_BADGE_BG_COLOR: '#bd6734',
    BLOCKED: 'blocked',
    BLOCKED_BADGE_BG_COLOR: '#973838',
    DEFAULT: 'default',
    DEFAULT_BADGE_BG_COLOR: '#7d9195',
    SUCCESS: 'success',
    SUCCESS_BADGE_BG_COLOR: '#088d08'
  },
  iconSizes: [
    512,
    256,
    128,
    96,
    64,
    48,
    32,
    24,
    19,
    16
  ]
}
