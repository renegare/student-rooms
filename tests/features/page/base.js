'use strict'

var Interface = require('cavalier').Interface

class Base extends Interface {
  get debug () {
    return this.adapter.driver.debug()
  }

  waitUntil (cb, timeout) {
    return this.adapter.driver.waitUntil(cb, timeout)
  }
}

module.exports = Base
