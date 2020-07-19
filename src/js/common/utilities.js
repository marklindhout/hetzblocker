'use strict'

module.exports = {
  stripTrailingSlash: function (str) {
    let cleanStr = str

    while (cleanStr.endsWith('/') && cleanStr.length > 1) {
      cleanStr = cleanStr.substr(0, cleanStr.length - 1)
    }

    return cleanStr
  }
}
