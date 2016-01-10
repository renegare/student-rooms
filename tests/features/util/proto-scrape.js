var request = require('request-promise')
var $ = require('cheerio')
var urlParse = require('url').parse
var urlFormat = require('url').format
var debug = require('debug')('student:scrape')

module.exports = function (url) {
  debug('requesting', url)
  var resource = urlParse(url)

  return request(url)
    .then(res => {
      var topPropertyURL = urlFormat({
            protocol: resource.protocol,
            host: resource.host,
            pathname: $(res).find('.listing-item__bd--property')
              .closest('.listing-item')
              .eq(0).find('a').eq(0).attr('href')
          })
      debug('first property url', topPropertyURL)
      return topPropertyURL
    })
    .then(url => request(url).then(res => $(res)))
    .then($page => {
      var data = {
        name: $page.find('h1.large-header').text().trim(),
        address: $page.find('*[itemprop=address]').text().trim(),
        // images: $page.find('#gallery li')
        //   .map((i, e) => {
        //     return urlFormat({
        //       protocol: resource.protocol,
        //       host: resource.host,
        //       pathname: $(e).css('background-image').replace(/url\(([^\)]+)\)/, '$1')
        //     })
        //   }).toArray(),
        // description: $page.find('section.intro_panel .contained-content')
        //     .find('p, .expand-target div')
        //     .map((i, e) => $(e).html().trim())
        //     .toArray()
        //     .join("\n\n"),
        // roomtTypes: $page.find('.rooms__list .tabs__menu__item')
        //   .map((i,e) => {
        //     var $e = $(e)
        //     return {
        //       name: $e.find('.tabs__menu__btn').text().trim(),
        //       description: $e.find('.bottom__panel__details').html().trim(),
        //       images: $e.find('.gallery li').map((i, e) => {
        //           return urlFormat({
        //             protocol: resource.protocol,
        //             host: resource.host,
        //             pathname: $(e).css('background-image').replace(/url\(([^\)]+)\)/, '$1')
        //           })
        //         }).toArray()
        //     }
        //   }).toArray(),
        // facilities: $page.find('.features .features__feature')
        //   .map((i, e) => {
        //     return {
        //       name: $(e).find('h3').text().trim(),
        //       description: $(e).find('p').text().trim()
        //     }
        //   }).toArray()
      }
      debug('expected data', data)
      return data
    })
}
