const request = require('../../src/js/background/request.js')
const config = require('../../src/js/common/config.js')

// Browser mocks
browser.extension = { getURL: jest.fn(a => a) }

test('init', function () {
  expect(request).not.toBeUndefined()
})

test('checkUrlListingStatus', function () {
  // Non-blocked URL
  expect(request.checkUrlListingStatus({ url: '://example.test' })).toEqual(undefined)

  // Blocked URL
  expect(request.checkUrlListingStatus({ url: 'http://bild.de' })).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
})

test('redirectToBlockMessagePage', function () {
  expect(request.redirectToBlockMessagePage()).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
})
