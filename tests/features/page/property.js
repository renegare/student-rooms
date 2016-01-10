'use strict'

var Base = require('./base')
var all = require('bluebird').all

class Property extends Base {
  constructor (adapter) {
    super(adapter)

    this.element('mainMenu', 'nav#main')
    this.element('name', '#property-name')
    this.element('address', '#address')
    this.element('image', '#image')
    this.element('description', '#description')
    this.element('ratings', '#ratings')
    this.element('contact', '#contact')
    this.element('roomQuantity', '#room-quantity')
    this.element('roomTypes', '#room-types')
    this.element('facilities', '#facilities')
  }

  waitTillVisible (timeout) {
    return this.waitUntil(() => {
        return this.mainMenu.waitTillVisible(timeout)
          .then(() => this.name.waitTillVisible(timeout))
          .then(() => this.address.waitTillVisible(timeout))
          .then(() => this.image.waitTillVisible(timeout))
          .then(() => this.description.waitTillVisible(timeout))
          .then(() => this.ratings.waitTillVisible(timeout))
          .then(() => this.contact.waitTillVisible(timeout))
          .then(() => this.roomQuantity.waitTillVisible(timeout))
          .then(() => this.roomTypes.waitTillVisible(timeout))
          .then(() => this.facilities.waitTillVisible(timeout))
    }, timeout || 3000)
  }

  get propertyData () {
    return all([
      this.name.text(),
      this.address.text(),
      this.image.text(),
      this.description.text(),
      this.roomTypes.text(),
      this.facilities.text()
    ]).spread((name, address, images, description, roomTypes, facilities) => {
      return {
        name: name,
        address: address,
        // images: images,
        // description: description,
        // roomTypes: roomTypes,
        // facilities: facilities
      }
    })
  }
}

module.exports = Property
