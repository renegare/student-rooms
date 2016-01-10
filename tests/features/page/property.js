'use strict'

var Base = require('./base')
var all = require('bluebird').all
var debug = require('debug')('student:page')

class Gallery extends Base {
  constructor (adapter) {
    super(adapter)

    this.elements('images', 'img')
  }

  waitTillVisible (timeout) {
    return this.root.waitTillVisible(timeout)
  }

  imageUrls () {
    return this.images.length.then(l => {
      debug('no. images', l)
      var urls = []
      for (let i = 0; i < l; ++i) {
        urls.push(this.images.at(i).attr('src'))
      }
      return all(urls)
    })
  }
}

class RoomType extends Base {
  constructor (adapter) {
    super(adapter)
    this.element('name', '.name')
    this.element('description', '.description')
    this.elements('images', 'img')
  }

  get data () {
    return all([
      this.name.text(),
      this.description.text(),
      this.images.length.then(l => {
        debug('no. images', l)
        var urls = []
        for (let i = 0; i < l; ++i) {
          urls.push(this.images.at(i).attr('src'))
        }
        return all(urls)
      })
    ]).spread((name, description, images) => {
      return {
        name: name,
        description: description.replace("\n", ' '),
        images: images
      }
    })
  }
}

class RoomTypes extends Base {
  constructor (adapter) {
    super(adapter)
    this.sections(RoomType, 'types', '.type')
  }

  waitTillVisible (timeout) {
    return this.root.waitTillVisible(timeout)
  }

  getTypes () {
    return this.types.length.then(l => {
      var types = []
      for (let i = 0; i < l; ++i) {
        types.push(this.types.at(i).data)
      }
      return all(types)
    })
  }
}

class Facilities extends Base {
  constructor (adapter) {
    super(adapter)
    this.elements('types', '.facility')
  }

  getTypes () {
    return this.types.length.then(l => {
      var types = []
      for (let i = 0; i < l; ++i) {
        types.push(this.types.at(i).text())
      }
      return all(types)
    })
  }

  waitTillVisible (timeout) {
    return this.root.waitTillVisible(timeout)
  }
}

class Property extends Base {
  constructor (adapter) {
    super(adapter)

    this.element('mainMenu', 'nav#main')
    this.element('name', '#property-name')
    this.element('address', '#address')
    this.section(Gallery, 'gallery', '#gallery')
    this.element('description', '#description')
    this.element('ratings', '#ratings')
    this.element('contact', '#contact')
    this.element('roomQuantity', '#room-quantity')
    this.section(RoomTypes, 'roomTypes', '#room-types')
    this.section(Facilities, 'facilities', '#facilities')
  }

  waitTillVisible (timeout) {
    return this.waitUntil(() => {
        return this.mainMenu.waitTillVisible(timeout)
          .then(() => this.name.waitTillVisible(timeout))
          .then(() => this.address.waitTillVisible(timeout))
          .then(() => this.gallery.waitTillVisible(timeout))
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
      this.gallery.imageUrls(),
      this.description.text(),
      this.roomTypes.getTypes(),
      this.facilities.getTypes()
    ]).spread((name, address, images, description, roomTypes, facilities) => {
      var data = {
        name: name,
        address: address,
        images: images,
        description: description,
        roomTypes: roomTypes,
        facilities: facilities.map(f => {
          return {name: f}
        })
      }

      debug('display property information', "\n" + JSON.stringify(data))
      return data
    })
  }
}

module.exports = Property
