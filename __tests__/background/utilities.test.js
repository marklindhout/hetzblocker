const utilities = require('../../src/js/background/utilities.js')
const config = require('../../src/js/common/config.js')

describe('Locale Retrieval', function () {
  test('getSimplifiedBrowserLocale', function () {
    // Expect config.defaultLocale.
    expect(utilities.getSimplifiedBrowserLocale()).toEqual(config.defaultLocale)

    // Calls the correct browser API function.
    expect(browser.i18n.getUILanguage).toHaveBeenCalled()
    expect(browser.i18n.getUILanguage).toHaveBeenCalledTimes(1)

    // Provide a different locale, expect that to return.
    browser.i18n.getUILanguage = jest.fn(() => 'nl_NL')
    expect(utilities.getSimplifiedBrowserLocale()).toEqual('nl_NL')

    // Provide a locale as Undefined, expect config.defaultLocale.
    browser.i18n.getUILanguage = jest.fn(() => undefined)
    expect(utilities.getSimplifiedBrowserLocale()).toEqual(config.defaultLocale)
  })
})

describe('Object Helper Functions', function () {
  test('isObjectEmpty', function () {
    // Non-object argument
    expect(function () { utilities.isObjectEmpty('hallo') }).toThrow('Provided argument is not an object')
    expect(function () { utilities.isObjectEmpty(12121) }).toThrow('Provided argument is not an object')

    // Empty object
    expect(utilities.isObjectEmpty({})).toEqual(true)
    expect(utilities.isObjectEmpty([])).toEqual(true)

    // Non-empty object
    expect(utilities.isObjectEmpty({ foo: 'bar' })).toEqual(false)
    expect(utilities.isObjectEmpty([0])).toEqual(false)
  })
})
