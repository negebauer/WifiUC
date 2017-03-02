import Url from '../../utils/url'
import Fetcher from '../../utils/fetcher'
let cheerio = require('cheerio')

export default class Devices {
  static loadDevicesRemote = session =>
    session
      .login()
      .then(() => Fetcher.post(Url.getMacList))
      .then(response => response.text())
      .then(html => {
        if (html.split('listaRegMac').length === 1) {
          console.log('retry')
          return Devices.loadDevicesRemote(session)
        }
        const data = html.split('listaRegMac')[1].split('/tbody')[0]
        const devices = []
        let $ = cheerio.load(html)
        if ($('.listaRegMac').length === 0) {
          return Devices.loadDevicesRemote(session)
        } else {
          $('.listaRegMac tr[id^=registro_]').each(function(i, el) {
            void i
            const name = $(el).find('td div[id^=nombreReg]').text()
            const mac = $(el)
              .find('td div[id^=macReg]')
              .text()
              .split('-')
              .join('')
              .toLowerCase()
            devices.push({mac, name, active: true})
          })
        }
        console.log('devices remote')
        console.log(devices)
        return devices
      })
}
