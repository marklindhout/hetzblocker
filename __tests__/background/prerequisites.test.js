const pr = require('../../src/js/background/prerequisites.js')
const config = require('../../src/js/common/config.js')

describe('Initialization', function () {
  test('init', function () {
    pr.init()

    expect(window.browser).not.toBeUndefined()
  })
})
