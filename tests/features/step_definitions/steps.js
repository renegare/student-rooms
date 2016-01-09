'use strict'

var expect = require('chai').expect
var PropertyPage = require('../page/property')
var debug = require('debug')('student:step')
var co = require('bluebird').coroutine

module.exports = function () {
  this.When(/^I visit "([^"]*)"$/, function (url) {
    return this.adapter.driver.url(url)
  })

  this.Then(/^I should see "([^"]*)"$/, function (text) {
    return this.adapter.driver.getText('body')
      .then(txt => {
        expect(txt).to.eql(text)
      })
  })

  this.Then(/^I should see the property page in (\d+)s$/, function (seconds) {
    this.page =  new PropertyPage(this.adapter)
    return this.page.waitTillVisible(seconds * 1000)
  });

  this.Then(/^displayed info should match top listed property on "([^"]*)"$/, function (url) {
    return co(function * () {
      var property = yield this.page.propertyData
      debug('display property information', property)
      return this.debug
    }.bind(this))()
  })

}
