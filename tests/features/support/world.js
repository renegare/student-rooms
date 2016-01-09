var Adapter = require('../util/adapter')

function World () {
  this.adapter = new Adapter({
    desiredCapabilities: {
      browserName: process.env.BROWSER || 'firefox'
    },
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  })

  Object.defineProperty(this, 'debug', {
    get: () => this.adapter.driver.debug()
  })
}

module.exports = function () {
  this.World = World
}
