'use strict'

var WebdriverIOAdapter = require('cavalier/lib/adapter/webdriverio')
var debug = require('debug')('student:wd')

function stringify (e) {
  return '{' + e.selector.join('}-{') + '}'
}

class Adapter extends WebdriverIOAdapter {
  waitTillVisible (e, timeout) {
    debug('waitTillVisible', stringify(e))
    var d = this.driver
    return d.waitUntil(() => {
      return this.find(e)
        .then(e => {
            return d.elementIdDisplayed(e.ELEMENT)
              .then(v => v.value)
        }, () => false)
    }, timeout || 3000)
  }

  find (e) {
    debug('find', stringify(e))
    return this.findAll(e)
      .then(es => {
        if(!es.length) {
          debug('No element found:', stringify(e))
          throw new Error('No element found matching selector: ' + stringify(e))
        }

        debug('found element', stringify(e))
        return es.shift()
      })
  }

  text (e) {
    return this.find(e)
      .then(e => {
        return this.driver.elementIdText(e.ELEMENT).then(res => res.value)
      })
  }
}

module.exports = Adapter
