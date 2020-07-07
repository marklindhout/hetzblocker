'use strict'

module.exports = {
  stripTrailingSlash: function (str) {
    if (str.endsWith('/')) {
      str = str.substr(0, str.length - 1);
    }

    return str
  }
}
