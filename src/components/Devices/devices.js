import Url from '../../utils/url'
import Fetcher from '../../utils/fetcher'
import Device from './device'
let cheerio = require('cheerio')

const storageKey = 'devices'

export default class Devices {

  static save = (devices) => {
    console.log('save devices')
    console.log(devices)
    storage.save({key: storageKey, rawData: devices})
  }

  static loadLocal = () => {
    return storage.load({key: storageKey, autoSync: false}).then(devices => devices.map(d => new Device(d)))
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
        return Devices.loadRemote(session)
      } else {
        $('.listaRegMac tr[id^=registro_]').each(function (i, el) {
          void(i)
          const name = $(el).find('td div[id^=nombreReg]').text()
          const mac = $(el).find('td div[id^=macReg]').text().split('-').join('').toLowerCase()
          const device = new Device({mac, name, active: true})
          devices.push(device)
        })
      }
      console.log('devices remote')
      console.log(devices)
      return devices
    })
  }
}
