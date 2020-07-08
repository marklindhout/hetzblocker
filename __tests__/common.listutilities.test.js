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

test('normalizeToDomain', function () {
  expect(listUtilities.normalizeToDomain('https://www.google.com/')).toEqual('google.com')
  expect(listUtilities.normalizeToDomain('https://sub.example.com/')).toEqual('example.com')

  // Bare domains
  expect(listUtilities.normalizeToDomain('example.com')).toEqual('example.com')
  expect(listUtilities.normalizeToDomain('sub.example.com')).toEqual('example.com')
})

test('isDomainBlocked', function () {
  // Empty argument
  expect(function () { listUtilities.isDomainBlocked('') }).toThrow('No URL string specified')

  // Non-matching URLSs
  expect(listUtilities.isDomainBlocked('https://www.google.com/')).toEqual(false)
  expect(listUtilities.isDomainBlocked('https://lorelle.wordpress.com/')).toEqual(false)

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

test('isPageBlocked', function () {
  // Empty argument
  expect(function () { listUtilities.isPageBlocked('') }).toThrow('No URL string specified')

  // Strange URLs
  expect(listUtilities.isPageBlocked('/')).toEqual(false)

  // Non-blocked pages
  expect(listUtilities.isPageBlocked('https://www.google.com/')).toEqual(false)
  expect(listUtilities.isPageBlocked('http://google.com')).toEqual(false)
  expect(listUtilities.isPageBlocked('https://lorelle.wordpress.com/')).toEqual(false)
  expect(listUtilities.isPageBlocked('https://lorelle.wordpress.com/2009/04/08/example-of-a-perfect-personal-blog/')).toEqual(false)
  expect(listUtilities.isPageBlocked('https://twitter.com/BVG_Kampagne')).toEqual(false)

  // Blocked pages
  expect(listUtilities.isPageBlocked('http://facebook.com/bild')).toEqual(true) // no trailing slash
  expect(listUtilities.isPageBlocked('http://facebook.com/bild/')).toEqual(true)
  expect(listUtilities.isPageBlocked('https://twitter.com/bild')).toEqual(true) // no trailing slash
  expect(listUtilities.isPageBlocked('https://twitter.com/bild/')).toEqual(true)
})

test('isUrlBlocked', function () {
  // Empty url argument
  expect(function () { listUtilities.isUrlBlocked('') }).toThrow('No URL string specified')

  // Non-Blocked pages
  expect(listUtilities.isUrlBlocked('https://www.google.com/')).toEqual(false)
  expect(listUtilities.isUrlBlocked('http://google.com')).toEqual(false)
  expect(listUtilities.isUrlBlocked('https://lorelle.wordpress.com/')).toEqual(false)
  expect(listUtilities.isUrlBlocked('https://lorelle.wordpress.com/2009/04/08/example-of-a-perfect-personal-blog/')).toEqual(false)
  expect(listUtilities.isUrlBlocked('https://twitter.com/BVG_Kampagne')).toEqual(false)

  // Blocked pages
  expect(listUtilities.isUrlBlocked('http://facebook.com/bild')).toEqual(true) // no trailing slash
  expect(listUtilities.isUrlBlocked('http://facebook.com/bild/')).toEqual(true)
  expect(listUtilities.isUrlBlocked('https://twitter.com/bild')).toEqual(true) // no trailing slash
  expect(listUtilities.isUrlBlocked('https://twitter.com/bild/')).toEqual(true)

  // Local paths
  expect(listUtilities.isUrlBlocked('.')).toEqual(false)
  expect(listUtilities.isUrlBlocked('../../././')).toEqual(false)

  expect(listUtilities.isUrlBlocked('a')).toEqual(false)

  // Erroneous URLs
  expect(listUtilities.isUrlBlocked('ößäñ')).toEqual(false)
})
