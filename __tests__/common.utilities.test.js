const utilities = require('../src/js/common/utilities.js')

test('isUrlBlocked', function () {
  expect(utilities.stripTrailingSlash('banana/')).toEqual('banana')
  expect(utilities.stripTrailingSlash('/')).toEqual('')
  expect(utilities.stripTrailingSlash('https://www.google.com/')).toEqual('https://www.google.com')
})
