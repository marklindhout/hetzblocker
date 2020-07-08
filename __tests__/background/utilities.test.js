const utilities = require('../../src/js/background/utilities.js')

test('getSimplifiedBrowserLocale', function () {
  // Expect the default locale
  expect(utilities.getSimplifiedBrowserLocale()).toEqual('en')

  // expect to have been called
  expect(browser.i18n.getUILanguage).toHaveBeenCalled()
})

test('isObjectEmpty', function () {

  // Non-object argument
  expect(function () { utilities.isObjectEmpty('hallo') }).toThrow('Provided argument is not an object')
  expect(function () { utilities.isObjectEmpty(12121) }).toThrow('Provided argument is not an object')

  // Empty object
  expect(utilities.isObjectEmpty({})).toEqual(true)
  expect(utilities.isObjectEmpty([])).toEqual(true)
})
