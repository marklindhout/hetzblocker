// const config = require('../common/config.js')

/**
 * Retriewves and returns the specified query variable for the current window's URL.
 *
 * @param {String} variableName - The name of the variable to retrieve.
 * @returns {String|null}
 */

const retrieveQueryVariable = function (variableName) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  return urlParams.get(variableName) || null
}

/**
 * Sets the inner text node of the given DOM element to the provided value.
 *
 * @param elementID {String} - The DOM element ID of the element to place text inside of.
 * @param queryVarName {String} - The name of the query variable value to place.
 */

const setElementWithQueryVariable = function (elementID, queryVarName) {
  const el = document.getElementById(elementID)
  const value = retrieveQueryVariable(queryVarName)

  el.innerText = value || ''
}

/**
 * Automatic function calls
 */

setElementWithQueryVariable('blockUrl', 'blockUrl')
setElementWithQueryVariable('blockReason', 'blockReason')
