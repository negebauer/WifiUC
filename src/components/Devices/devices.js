import Url from '../../utils/url'
import Fetcher from '../../utils/fetcher'
let cheerio = require('cheerio')

const storageKey = 'devices'

export default class Devices {

  static loadLocal = () => {
    return storage.load({key: storageKey, autoSync: false})
  }

  static loadRemote = (session) => {
    return session.login().then(() => Fetcher.post(Url.getMacList)).then(response => response.text()).then(html => {
      if (html.split('listaRegMac').length === 1) {
        console.log('retry')
        return Devices.loadRemote(session)
      }
      const data = html.split('listaRegMac')[1].split('/tbody')[0]
      const devices = []
      let $ = cheerio.load(html)
      if ($('.listaRegMac').length === 0) {
        return this.loadDevices()
      } else {
        $('.listaRegMac tr[id^=registro_]').each(function (i, el) {
          void(i)
          devices.push({name: $(el).find('td div[id^=nombreReg]').text(), mac: $(el).find('td div[id^=macReg]').text().split('-').join('').toLowerCase()})
        })
      }
      return devices
    })
  }
}
