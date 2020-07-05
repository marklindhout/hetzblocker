const config = require('../gulpfile.js/gulpconfig.js')
const hetzblocker = require('../src/js/common/listutilities.js')

test('`hetzblocker` is defined', function (cb) {
  expect(hetzblocker).not.toBeUndefined()
})

test('`hetzblocker.common` is defined', function (cb) {
  expect(hetzblocker.common).not.toBeUndefined()
})

// test('Domain list contains bild.de', function () {
//   const dl = hetzblocker.common.listutilities.getListedDomains()
//   expect(dl).toContain('bild.de')
// })
