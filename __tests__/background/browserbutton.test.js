const bb = require('../../src/js/background/browserbutton.js')
const config = require('../../src/js/common/config.js')

// I18n mock
const trans = require('../../src/i18n/en/messages.json')

// Browser mocks
browser.i18n.getMessage = jest.fn(function (str) {
  return trans[str].message
})

browser.browserAction.setTitle = jest.fn(browser.browserAction.setTitle)

describe('State Helper Functions', function () {
  test('isValidState: No arguments', function () {
    expect(bb.isValidState()).toEqual(false)
  })

  test('isValidState: Invalid arguments', function () {
    expect(bb.isValidState(undefined)).toEqual(false)
    expect(bb.isValidState(true)).toEqual(false)
    expect(bb.isValidState(false)).toEqual(false)
    expect(bb.isValidState([])).toEqual(false)
    expect(bb.isValidState({})).toEqual(false)
    expect(bb.isValidState(12124123)).toEqual(false)
    expect(bb.isValidState(3.14127)).toEqual(false)
  })

  test('isValidState: Correct type, wrong string', function () {
    expect(bb.isValidState('lorem ipsum dolor sit amet')).toEqual(false)
    expect(bb.isValidState(' ')).toEqual(false)
    expect(bb.isValidState(` ${config.state.BLOCKED} `)).toEqual(false)
  })

  test('isValidState: Correct argument', function () {
    expect(bb.isValidState(config.state.BLOCKED)).toEqual(true)
    expect(bb.isValidState(config.state.WARNING)).toEqual(true)
    expect(bb.isValidState(config.state.SUCCESS)).toEqual(true)
    expect(bb.isValidState(config.state.DEFAULT)).toEqual(true)
  })

  test('normalizeStateArg: No arguments', function () {
    expect(bb.normalizeStateArg()).toEqual(config.state.DEFAULT)
  })

  test('normalizeStateArg: Invalid arguments', function () {
    expect(bb.normalizeStateArg(undefined)).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(true)).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(false)).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg([])).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg({})).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(12124123)).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(3.14127)).toEqual(config.state.DEFAULT)
  })

  test('normalizeStateArg: Correct type, wrong string', function () {
    expect(bb.normalizeStateArg('lorem ipsum dolor sit amet')).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(' ')).toEqual(config.state.DEFAULT)
    expect(bb.normalizeStateArg(' blocked ')).toEqual(config.state.DEFAULT)
  })

  test('normalizeStateArg: Correct argument', function () {
    expect(bb.normalizeStateArg(config.state.BLOCKED)).toEqual(config.state.BLOCKED)
    expect(bb.normalizeStateArg(config.state.WARNING)).toEqual(config.state.WARNING)
    expect(bb.normalizeStateArg(config.state.SUCCESS)).toEqual(config.state.SUCCESS)
    expect(bb.normalizeStateArg(config.state.DEFAULT)).toEqual(config.state.DEFAULT)
  })
})

describe('Browser Button: State', function () {
  beforeAll(function () {
    bb.setBrowserButtonIcon = jest.fn(bb.setBrowserButtonIcon)
    bb.setBrowserButtonTitle = jest.fn(bb.setBrowserButtonTitle)
    bb.setBrowserBadgeText = jest.fn(bb.setBrowserBadgeText)
  })

  test('setBrowserButtonState: Without argument', function () {
    bb.setBrowserButtonState()
    expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith(config.state.DEFAULT, undefined, undefined)
    expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith(config.state.DEFAULT, undefined, undefined)
  })

  test('setBrowserButtonState: Default argument', function () {
    bb.setBrowserButtonState(config.state.DEFAULT, 11, 23)
    expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith(config.state.DEFAULT, 11, 23)
    expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith(config.state.DEFAULT, 11, 23)
  })

  test('setBrowserButtonState: Other argument', function () {
    bb.setBrowserButtonState('lorem ipsum sit amet', 11, {bla: 23})
    expect(bb.setBrowserButtonIcon).toHaveBeenCalledWith(config.state.DEFAULT, 11, {bla: 23})
    expect(bb.setBrowserButtonTitle).toHaveBeenCalledWith(config.state.DEFAULT, 11, {bla: 23})
  })

  test('setBrowserButtonState: With data object argument', function () {
    const dataObj = {data: {amount: 12765}}
    bb.setBrowserButtonState(config.state.WARNING, 11, dataObj)
    expect(bb.setBrowserBadgeText).toHaveBeenCalledWith('12765', 11)
  })
})

describe('Browser Button: Badge', function () {
  test('setBrowserBadgeText', function () {
    // Expect this function to actually call the API.
    const str = 'banana'
    browser.browserAction.setBadgeText = jest.fn()

    bb.setBrowserBadgeText(str)
    expect(browser.browserAction.setBadgeText).toHaveBeenCalledWith({ text: str })
  })
})

describe('Browser Button: Title', function () {
  test('setBrowserButtonTitle: Without argument', function () {
    bb.setBrowserButtonTitle()
    expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_default')
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_default.message}` })
  })
  test('setBrowserButtonTitle: States', function () {
    bb.setBrowserButtonTitle(config.state.DEFAULT)
    expect(browser.browserAction.setTitle).toHaveBeenCalled()
    expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_default')
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_default.message}` })

    bb.setBrowserButtonTitle(config.state.BLOCKED)
    expect(browser.browserAction.setTitle).toHaveBeenCalled()
    expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_blocked')
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_blocked.message}` })

    bb.setBrowserButtonTitle(config.state.WARNING)
    expect(browser.browserAction.setTitle).toHaveBeenCalled()
    expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_warning')
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_warning.message}` })

    bb.setBrowserButtonTitle(config.state.SUCCESS)
    expect(browser.browserAction.setTitle).toHaveBeenCalled()
    expect(browser.i18n.getMessage).toHaveBeenCalledWith('browserButtonMessageState_success')
    expect(browser.browserAction.setTitle).toHaveBeenCalledWith({ title: `${trans.extensionName.message} — ${trans.browserButtonMessageState_success.message}` })
  })
})

describe('Browser Button: Icon', function () {
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

  test('setBrowserButtonIcon', function () {
    bb.setBrowserButtonIcon()
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_default })

    bb.setBrowserButtonIcon(config.state.DEFAULT)
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_default })

    bb.setBrowserButtonIcon(config.state.BLOCKED)
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_blocked })

    bb.setBrowserButtonIcon(config.state.WARNING)
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_warning })

    bb.setBrowserButtonIcon(config.state.SUCCESS)
    expect(browser.browserAction.setIcon).toHaveBeenLastCalledWith({ path: paths_success })
  })
})
