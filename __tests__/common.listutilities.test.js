const listUtilities = require('../src/js/common/listutilities.js')

test('getListedPages is defined', function () {
  expect(listUtilities.getListedPages).not.toBeUndefined()
})

test('getListedDomains is defined', function () {
  expect(listUtilities.getListedDomains).not.toBeUndefined()
})

test('Domain list contains bild.de', function () {
  const dl = listUtilities.getListedDomains()

  expect(dl).toContain('bild.de')
})

test('isDomainBlocked', function () {
  // Bare domains
  expect(listUtilities.isDomainBlocked('bild.de')).toEqual(true)
  expect(listUtilities.isDomainBlocked('welt.de')).toEqual(true)

  // Non-protocolled domains
  expect(listUtilities.isDomainBlocked('://bild.de')).toEqual(true)
  expect(listUtilities.isDomainBlocked('://bild.de/nonsense?var=val')).toEqual(true)

  // Non-SSL domains
  expect(listUtilities.isDomainBlocked('http://bild.de')).toEqual(true)
  expect(listUtilities.isDomainBlocked('http://bild.de/nonsense')).toEqual(true)
  expect(listUtilities.isDomainBlocked('http://bild.de/nonsense?var=val')).toEqual(true)

  // SSL domains
  expect(listUtilities.isDomainBlocked('https://bild.de')).toEqual(true)
  expect(listUtilities.isDomainBlocked('https://bild.de/nonsense')).toEqual(true)
  expect(listUtilities.isDomainBlocked('https://bild.de/nonsense?var=val')).toEqual(true)

  // Subdomains
  expect(listUtilities.isDomainBlocked('https://sport.bild.de')).toEqual(true)
  expect(listUtilities.isDomainBlocked('https://whatever.bild.de')).toEqual(true)

  // Query vars
  expect(listUtilities.isDomainBlocked('https://bild.de/?var=val')).toEqual(true)
  expect(listUtilities.isDomainBlocked('https://bild.de/?var=val&another=variable&a[]=1&a[]=2')).toEqual(true)
})
