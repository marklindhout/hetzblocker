const bb = require('../../src/js/background/browserbutton.js')
const config = require('../../src/js/common/config.js')

// I18n mock
const trans = require('../../src/i18n/en/messages.json')

// Browser mocks
browser.i18n.getMessage = jest.fn(function (str) {
  return trans[str].message
})

browser.browserAction.setTitle = jest.fn(browser.browserAction.setTitle)

test('isValidState', function () {
  // No arguments.
  expect(bb.isValidState()).toEqual(false)

  // Invalid arguments.
  expect(bb.isValidState(undefined)).toEqual(false)
  expect(bb.isValidState(true)).toEqual(false)
  expect(bb.isValidState(false)).toEqual(false)
  expect(bb.isValidState([])).toEqual(false)
  expect(bb.isValidState({})).toEqual(false)
  expect(bb.isValidState(12124123)).toEqual(false)
  expect(bb.isValidState(3.14127)).toEqual(false)

  // Correct type, wrong string.
  expect(bb.isValidState('lorem ipsum dolor sit amet')).toEqual(false)
  expect(bb.isValidState(' ')).toEqual(false)
  expect(bb.isValidState(' blocked ')).toEqual(false)

  // Correct strings.
  expect(bb.isValidState('blocked')).toEqual(true)
  expect(bb.isValidState('warning')).toEqual(true)
  expect(bb.isValidState('success')).toEqual(true)
  expect(bb.isValidState('default')).toEqual(true)
})

test('normalizeStateArg', function () {
  // No arguments.
  expect(bb.normalizeStateArg()).toEqual('default')

  // Invalid arguments.
  expect(bb.normalizeStateArg(undefined)).toEqual('default')
  expect(bb.normalizeStateArg(true)).toEqual('default')
  expect(bb.normalizeStateArg(false)).toEqual('default')
  expect(bb.normalizeStateArg([])).toEqual('default')
  expect(bb.normalizeStateArg({})).toEqual('default')
  expect(bb.normalizeStateArg(12124123)).toEqual('default')
  expect(bb.normalizeStateArg(3.14127)).toEqual('default')

  // Correct type, wrong string.
  expect(bb.normalizeStateArg('lorem ipsum dolor sit amet')).toEqual('default')
  expect(bb.normalizeStateArg(' ')).toEqual('default')
  expect(bb.normalizeStateArg(' blocked ')).toEqual('default')

  // Correct strings.
  expect(bb.normalizeStateArg('blocked')).toEqual('blocked')
  expect(bb.normalizeStateArg('warning')).toEqual('warning')
  expect(bb.normalizeStateArg('success')).toEqual('success')
  expect(bb.normalizeStateArg('default')).toEqual('default')
})

test('setBrowserBadgeText', function () {
  // Expect this function to actually call the API.
  const str = 'banana'
  browser.browserAction.setBadgeText = jest.fn()

  bb.setBrowserBadgeText(str)
  expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: str })
})

test('setBrowserButtonTitle', function () {
  // Call without argument, reverts to 'default' string.
  bb.setBrowserButtonTitle()
  expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_default')
  expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_default.message}` })

  // States
  bb.setBrowserButtonTitle('default')
  expect(browser.browserAction.setTitle).toHaveBeenCalled()
  expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_default')
  expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_default.message}` })

  bb.setBrowserButtonTitle('blocked')
  expect(browser.browserAction.setTitle).toHaveBeenCalled()
  expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_blocked')
  expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_blocked.message}` })

  bb.setBrowserButtonTitle('warning')
  expect(browser.browserAction.setTitle).toHaveBeenCalled()
  expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_warning')
  expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_warning.message}` })

  bb.setBrowserButtonTitle('success')
  expect(browser.browserAction.setTitle).toHaveBeenCalled()
  expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_success')
  expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_success.message}` })
})

test('setBrowserButtonIcon', function () {
  const paths_default = {
    '512': 'data/icon/icon_default_512.png',
    '256': 'data/icon/icon_default_256.png',
    '128': 'data/icon/icon_default_128.png',
    '96': 'data/icon/icon_default_96.png',
    '64': 'data/icon/icon_default_64.png',
    '48': 'data/icon/icon_default_48.png',
    '32': 'data/icon/icon_default_32.png',
    '24': 'data/icon/icon_default_24.png',
    '19': 'data/icon/icon_default_19.png',
    '16': 'data/icon/icon_default_16.png'
  }

  const paths_blocked = {
    '512': 'data/icon/icon_blocked_512.png',
    '256': 'data/icon/icon_blocked_256.png',
    '128': 'data/icon/icon_blocked_128.png',
    '96': 'data/icon/icon_blocked_96.png',
    '64': 'data/icon/icon_blocked_64.png',
    '48': 'data/icon/icon_blocked_48.png',
    '32': 'data/icon/icon_blocked_32.png',
    '24': 'data/icon/icon_blocked_24.png',
    '19': 'data/icon/icon_blocked_19.png',
    '16': 'data/icon/icon_blocked_16.png'
  }

  const paths_warning = {
    '512': 'data/icon/icon_warning_512.png',
    '256': 'data/icon/icon_warning_256.png',
    '128': 'data/icon/icon_warning_128.png',
    '96': 'data/icon/icon_warning_96.png',
    '64': 'data/icon/icon_warning_64.png',
    '48': 'data/icon/icon_warning_48.png',
    '32': 'data/icon/icon_warning_32.png',
    '24': 'data/icon/icon_warning_24.png',
    '19': 'data/icon/icon_warning_19.png',
    '16': 'data/icon/icon_warning_16.png'
  }

  const paths_success = {
    '512': 'data/icon/icon_success_512.png',
    '256': 'data/icon/icon_success_256.png',
    '128': 'data/icon/icon_success_128.png',
    '96': 'data/icon/icon_success_96.png',
    '64': 'data/icon/icon_success_64.png',
    '48': 'data/icon/icon_success_48.png',
    '32': 'data/icon/icon_success_32.png',
    '24': 'data/icon/icon_success_24.png',
    '19': 'data/icon/icon_success_19.png',
    '16': 'data/icon/icon_success_16.png'
  }

  browser.browserAction.setIcon = jest.fn()
  browser.extension = { getURL: jest.fn(a => a) }

  bb.setBrowserButtonIcon()
  expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_default })

  bb.setBrowserButtonIcon('default')
  expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_default })

  bb.setBrowserButtonIcon('blocked')
  expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_blocked })

  bb.setBrowserButtonIcon('warning')
  expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_warning })

  bb.setBrowserButtonIcon('success')
  expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_success })
})

test('setBrowserButtonState', function () {
  bb.setBrowserButtonIcon = jest.fn(bb.setBrowserButtonIcon)
  bb.setBrowserButtonTitle = jest.fn(bb.setBrowserButtonTitle)

  // No argument
  bb.setBrowserButtonState()
  expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith(undefined)
  expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith(undefined)

  // 'default' argument
  bb.setBrowserButtonState('default')
  expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith('default')
  expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith('default')

  // 'lorem ipsum sit amet' argument
  bb.setBrowserButtonState('lorem ipsum sit amet')
  expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith('lorem ipsum sit amet')
  expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith('lorem ipsum sit amet')
})
