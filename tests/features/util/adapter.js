'use strict'

var WebdriverIOAdapter = require('cavalier/lib/adapter/webdriverio')
var debug = require('debug')('student:wd')

function stringify (e) {
  return '{' + e.selector.join('}-{') + '}'
}

class Adapter extends WebdriverIOAdapter {
}

module.exports = Adapter
