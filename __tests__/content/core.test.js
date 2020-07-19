const core = require('../../src/js/content/core.js')
const config = require('../../src/js/common/config.js')

describe('DOM Helper Functions', function () {
  test('addListedClassToElement', function () {
    const elem = document.createElement('div')
    core.addListedClassToElement(elem)
    expect(elem.classList.contains(config.listedLinkClassName)).toEqual(true)
  })

  test('removeAllAttributes', function () {
    document.body.innerHTML = '<div id="example" data-event="bar" class="strong left light dark"></div>'

    const elem = document.getElementById('example')
    core.removeAllAttributes(elem)
    expect(elem.outerHTML).toEqual('<div></div>')
  })

  test('removeAllEventListeners', function () {
    document.body.innerHTML = '<div id="example" data-event="bar" class="strong left light dark"></div>'

    const event = new CustomEvent('myEvent')
    const elem = document.getElementById('example')
    const listenerFn = jest.fn()
    const listener = elem.addEventListener('myEvent', listenerFn, false)

    elem.dispatchEvent(event)
    expect(listenerFn).toHaveBeenCalledTimes(1)

    core.removeAllEventListeners(elem)

    const elem2 = document.getElementById('example')
    elem2.dispatchEvent(event)
    expect(listenerFn).toHaveBeenCalledTimes(1)
  })
})

describe('Link Scanning and Transformation', function () {
  test('scanAllLinks', function () {
    document.body.innerHTML = '<a href="http://whatever.test">whatever</a>'
    core.scanAllLinks()
    expect(document.body.innerHTML).toEqual('<a href="http://whatever.test">whatever</a>')

    document.body.innerHTML = '<a href="https://bild.de">x</a>'
    core.scanAllLinks()
    expect(document.body.innerHTML).toEqual(`<a class="${config.listedLinkClassName}">x</a>`)
  })
})

describe('Initialization', function () {
  test('init', function () {
    core.bindDocumentMutationObserver = jest.fn()
    core.scanAllLinks = jest.fn()

    core.init()

    expect(core.bindDocumentMutationObserver).toHaveBeenCalled()
    expect(core.scanAllLinks).toHaveBeenCalled()
  })
})
