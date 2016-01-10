'use strict'

var debug = require('debug')('student:hook')

module.exports = function () {
  this.After(function (scenario) {
    return this.adapter.driver.close()
      .then(null, () => console.log('error closing session ...'))
  })
}
