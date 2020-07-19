const utilities = require('../../src/js/common/utilities.js')

describe('Trailing Slashes', function () {
  test('stripTrailingSlash: Normal trailing slashes on URLs', function () {
    expect(utilities.stripTrailingSlash('banana/')).toEqual('banana')
    expect(utilities.stripTrailingSlash('https://subdomain.domain.test/')).toEqual('https://subdomain.domain.test')
  })

  test('stripTrailingSlash: Multiple ending slashes', function () {
    expect(utilities.stripTrailingSlash('banana//')).toEqual('banana')
    expect(utilities.stripTrailingSlash('banana////////////////////////////////////////')).toEqual('banana')
    expect(utilities.stripTrailingSlash('https://subdomain.domain.test//')).toEqual('https://subdomain.domain.test')
    expect(utilities.stripTrailingSlash('https://subdomain.domain.test////////')).toEqual('https://subdomain.domain.test')
  })

  test('stripTrailingSlash: Empty path', function () {
    expect(utilities.stripTrailingSlash('')).toEqual('')
  })

  test('stripTrailingSlash: Root paths', function () {
    expect(utilities.stripTrailingSlash('/')).toEqual('/')
    expect(utilities.stripTrailingSlash('//')).toEqual('/')
    expect(utilities.stripTrailingSlash('///')).toEqual('/')
  })

  test('stripTrailingSlash: Relative paths', function () {
    expect(utilities.stripTrailingSlash('./')).toEqual('.')
    expect(utilities.stripTrailingSlash('.')).toEqual('.')
    expect(utilities.stripTrailingSlash('../')).toEqual('..')
    expect(utilities.stripTrailingSlash('..')).toEqual('..')
  })

  test('stripTrailingSlash: Edge cases', function () {
    expect(utilities.stripTrailingSlash('/////.///.//././///')).toEqual('/////.///.//./.')
    expect(utilities.stripTrailingSlash('//banana////')).toEqual('//banana')
    expect(utilities.stripTrailingSlash('___/')).toEqual('___')
  })
})
