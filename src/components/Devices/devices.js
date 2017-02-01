import Url from '../../utils/url'
import Fetcher from '../../utils/fetcher'
import Device from './Device/device'
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

  static validate = (response, retry) => {
    return response.text().then(html => {
      console.log('Device edit response')
      console.log(html)
      let $ = cheerio.load(html)
      if (!$('.exito').length) {
        if (html.indexOf('CAS') !== -1) {
          return retry()
        }
        console.log('throw!')
        console.log('errro')
        console.log($('.error').text())
        throw {message: $('.error').text()}
      }
    })
  }

  static addDevice = (session, device) => {
    const retry = () => Devices.addDevice(device, session)
    return session.login().then(() => {
      const body = {
        mac: device.mac,
        nombreDispositivo: device.name
      }
      return Fetcher.post(Url.add, body, true).then(res => Devices.validate(res, retry))
    })
  }

  static removeDevice = (session, device) => {
    const retry = () => Devices.removeDevice(device)
    return session.login().then(_ => {
      const body = {
        mac: device.mac
      }
      return Fetcher.post(Url.remove, body, true).then(res => Devices.validate(res, retry))
    })
  }

  static editDevice = (session, deviceOld, deviceNew) => {
    const retry = () => Devices.editDevice(deviceOld, deviceNew)
    return session.login().then(() => {
      const body = {
        macAntes: deviceOld.mac,
        macDespues: deviceNew.mac,
        nombreDispositivoAntes: deviceOld.name,
        nombreDispositivoDespues: deviceNew.name
      }
      return Fetcher.post(Url.edit, body, true).then(res => Devices.validate(res, retry))
    })
  }

}
