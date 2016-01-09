'use strict'

var expect = require('chai').expect

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
}
