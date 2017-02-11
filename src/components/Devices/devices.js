import Url from '../../utils/url'
import Fetcher from '../../utils/fetcher'
let cheerio = require('cheerio')

const storageKey = 'devices'

export default class Devices {

  static convertDataToDevices = (data) => Object.keys(data).map(mac => data[mac])

  static convertDevicesToData = (devicesToSave) => {
    const data = {}
    const devices = devicesToSave.split()
    devices.forEach(device => device.active = false)
    devices.forEach(device => data[device.mac] = device)
    return data
  }

  static saveDevice = (device) => {
    Devices.loadDataLocal().then(data => {
      device.active = false
      data[device.mac] = device
      Devices.saveData(data)
    })
  }

  static saveData = (data) => storage.save({key: storageKey, rawData: data})

  static saveDevices = (devices) => Devices.saveData(Devices.convertDevicesToData(devices))

  static loadDataLocal = () => storage.load({key: storageKey, autoSync: false})

  static loadDevicesLocal = () => Devices.loadDataLocal().then(Devices.convertDataToDevices)

  static loadDevicesRemote = (session) => {
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
          devices.push({mac, name, active: true})
        })
      }
      console.log('devices remote')
      console.log(devices)
      return devices
    })
  }

}
