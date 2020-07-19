const listUtilities = require('../../src/js/common/listutilities.js')

describe('Domain normalization', function () {
  test('normalizeToDomain: Empty url argument', function () {
    expect(function () { listUtilities.normalizeToDomain('') }).toThrow('No URL string specified')
  })

  test('normalizeToDomain: Full URLs', function () {
    expect(listUtilities.normalizeToDomain('https://hetzblocker.test.url.tld/')).toEqual('url.tld')
    expect(listUtilities.normalizeToDomain('https://hetzblocker.test.url.tld/banana/')).toEqual('url.tld')

    expect(listUtilities.normalizeToDomain('https://another.url.test/')).toEqual('url.test')
    expect(listUtilities.normalizeToDomain('https://another.url.test/foo/bar')).toEqual('url.test')
  })

  test('normalizeToDomain: Bare domains', function () {
    expect(listUtilities.normalizeToDomain('example.test')).toEqual('example.test')
    expect(listUtilities.normalizeToDomain('sub.example.test')).toEqual('example.test')
  })
})

describe('Domain-based blocking', function () {
  const blockedDomains = ['url.tld', 'another.test']
  const nonBlockedDomains = ['notblocked.test', 'also-not-blocked.tld']

  beforeAll(function () {
    listUtilities.getListedDomains = jest.fn(() => blockedDomains)
  })

  test('isDomainBlocked: Empty argument', function () {
    expect(function () { listUtilities.isDomainBlocked('') }).toThrow('No URL string specified')
  })

  test('isDomainBlocked: Non-matching URLs', function () {
    expect(listUtilities.isDomainBlocked(nonBlockedDomains[0])).toEqual(false)
    expect(listUtilities.isDomainBlocked(nonBlockedDomains[1])).toEqual(false)
  })

  test('isDomainBlocked: Bare domains', function () {
    expect(listUtilities.isDomainBlocked(blockedDomains[0])).toEqual(true)
    expect(listUtilities.isDomainBlocked(blockedDomains[1])).toEqual(true)
  })

  test('isDomainBlocked: Non-protocolled domains', function () {
    expect(listUtilities.isDomainBlocked('://hetzblocker.test.url.tld')).toEqual(true)
    expect(listUtilities.isDomainBlocked('://' + blockedDomains[0])).toEqual(true)
    expect(listUtilities.isDomainBlocked('://' + blockedDomains[0] + '/nonsense?var=val')).toEqual(true)
  })

  test('isDomainBlocked: Non-SSL domains', function () {
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[0])).toEqual(true)
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[0] + '/nonsense')).toEqual(true)
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[0] + '/nonsense?var=val')).toEqual(true)
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[1])).toEqual(true)
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[1] + '/nonsense')).toEqual(true)
    expect(listUtilities.isDomainBlocked('http://' + blockedDomains[1] + '/nonsense?var=val')).toEqual(true)
  })

  test('isDomainBlocked: SSL domains', function () {
    expect(listUtilities.isDomainBlocked('https://' + 'hetzblocker.test.url.tld')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[0])).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[0] + '/nonsense')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[0] + '/nonsense?var=val')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[1])).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[1] + '/nonsense')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[1] + '/nonsense?var=val')).toEqual(true)
  })

  test('isDomainBlocked: Subdomains', function () {
    expect(listUtilities.isDomainBlocked('https://sudom.' + blockedDomains[0])).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://sudom.' + blockedDomains[1])).toEqual(true)
  })

  test('isDomainBlocked: Query vars', function () {
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[0] + '/?var=val')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[1] + '/?var=val')).toEqual(true)

    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[0] + '/?var=val&another=variable&a[]=1&a[]=2')).toEqual(true)
    expect(listUtilities.isDomainBlocked('https://' + blockedDomains[1] + '/?var=val&another=variable&a[]=1&a[]=2')).toEqual(true)
  })
})

describe('URL-based blocking', function () {
  const blockedPages = ['http://facebook.com.test/hetzblocker.blocked', 'https://twitter.com.test/hetzblocker.alsoblocked']
  const nonBlockedPages = ['http://facebook.com.test/hetzblocker.open', 'https://twitter.com.test/hetzblocker.noproblem']

  beforeAll(function () {
    listUtilities.getListedPages = jest.fn(() => blockedPages)
  })

  test('isPageBlocked: Empty argument', function () {
    expect(function () { listUtilities.isPageBlocked('') }).toThrow('No URL string specified')
  })

  test('isPageBlocked: Strange URLs', function () {
    expect(listUtilities.isPageBlocked('/')).toEqual(false)
  })

  test('isPageBlocked: Non-blocked pages', function () {
    expect(listUtilities.isPageBlocked(nonBlockedPages[0])).toEqual(false)
    expect(listUtilities.isPageBlocked(nonBlockedPages[0] + '/')).toEqual(false)

    expect(listUtilities.isPageBlocked(nonBlockedPages[1])).toEqual(false)
    expect(listUtilities.isPageBlocked(nonBlockedPages[1] + '/')).toEqual(false)
  })

  test('isPageBlocked: Blocked pages', function () {
    expect(listUtilities.isPageBlocked(blockedPages[0])).toEqual(true)
    expect(listUtilities.isPageBlocked(blockedPages[0] + '/')).toEqual(true)

    expect(listUtilities.isPageBlocked(blockedPages[1])).toEqual(true)
    expect(listUtilities.isPageBlocked(blockedPages[1] + '/')).toEqual(true)
  })

  test('isUrlBlocked: Empty url argument', function () {
    expect(function () { listUtilities.isUrlBlocked('') }).toThrow('No URL string specified')
  })

  test('isUrlBlocked: Non-Blocked pages', function () {
    expect(listUtilities.isUrlBlocked(nonBlockedPages[0])).toEqual(false)
    expect(listUtilities.isUrlBlocked(nonBlockedPages[0] + '/')).toEqual(false)

    expect(listUtilities.isUrlBlocked(nonBlockedPages[1])).toEqual(false)
    expect(listUtilities.isUrlBlocked(nonBlockedPages[1] + '/')).toEqual(false)
  })

  test('isUrlBlocked: Blocked pages', function () {
    expect(listUtilities.isUrlBlocked(blockedPages[0])).toEqual(true)
    expect(listUtilities.isUrlBlocked(blockedPages[0] + '/')).toEqual(true)

    expect(listUtilities.isUrlBlocked(blockedPages[1])).toEqual(true)
    expect(listUtilities.isUrlBlocked(blockedPages[1] + '/')).toEqual(true)
  })

  test('isUrlBlocked: Local paths', function () {
    expect(listUtilities.isUrlBlocked('.')).toEqual(false)
    expect(listUtilities.isUrlBlocked('../../././')).toEqual(false)
    expect(listUtilities.isUrlBlocked('a')).toEqual(false)
  })

  test('isUrlBlocked: Erroneous URLs', function () {
    expect(listUtilities.isUrlBlocked('ößäñ')).toEqual(false)
  })
})
