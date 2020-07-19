const request = require('../../src/js/background/request.js')
const config = require('../../src/js/common/config.js')
const listUtilities = require('../../src/js/common/listutilities.js')

describe('URL Listing Status', function () {
  const blockedPages = ['http://facebook.com.test/hetzblocker.blocked', 'https://twitter.com.test/hetzblocker.alsoblocked']
  const nonBlockedPages = ['http://facebook.com.test/hetzblocker.open', 'https://twitter.com.test/hetzblocker.noproblem']

  beforeAll(function () {
    browser.extension = { getURL: jest.fn(a => a) }

    listUtilities.getListedPages = jest.fn(() => blockedPages)
  })

  test('checkUrlListingStatus: Non-blocked URL', function () {
    expect(request.checkUrlListingStatus({ url: nonBlockedPages[0] })).toEqual(undefined)
    expect(request.checkUrlListingStatus({ url: nonBlockedPages[1] })).toEqual(undefined)
  })

  test('checkUrlListingStatus: Blocked URL', function () {
    expect(request.checkUrlListingStatus({ url: blockedPages[0] })).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
    expect(request.checkUrlListingStatus({ url: blockedPages[1] })).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
  })
})

describe('Domain Listing Status', function () {
  const blockedDomains = ['url.tld', 'another.test']
  const nonBlockedDomains = ['notblocked.test', 'also-not-blocked.tld']

  beforeAll(function () {
    browser.extension = { getURL: jest.fn(a => a) }

    listUtilities.getListedDomains = jest.fn(() => blockedDomains)
  })

  test('checkUrlListingStatus: Non-blocked domains', function () {
    expect(request.checkUrlListingStatus({ url: nonBlockedDomains[0] })).toEqual(undefined)
    expect(request.checkUrlListingStatus({ url: nonBlockedDomains[1] })).toEqual(undefined)
  })

  test('checkUrlListingStatus: Blocked domains', function () {
    expect(request.checkUrlListingStatus({ url: blockedDomains[0] })).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
    expect(request.checkUrlListingStatus({ url: blockedDomains[1] })).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
  })
})

describe('Redirection Response', function () {
  test('redirectToBlockMessagePage', function () {
    expect(request.redirectToBlockMessagePage()).toEqual({ redirectUrl: `data/html/block_${config.defaultLocale}.html` })
  })
})
