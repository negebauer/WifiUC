import Devices from '../devices'
import Fetcher from '../../utils/fetcher'
import Url from '../../utils/url'
let cheerio = require('cheerio')

export default class Device {
  static formattedMac = mac => mac.toUpperCase().match(/.{1,2}/g).join(':')

  static toggle = (session, device) => {
    switch (device.active) {
      case true:
        return Device.removeDevice(session, device)
      case false:
        return Device.addDevice(session, device)
    }
  }

  static validate = (response, retry, data) => {
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
      return data
    })
  }

  static addDevice = (session, device) => {
    const retry = () => Device.addDevice(device, session)
    return session.login().then(() => {
      const body = {
        mac: device.mac,
        nombreDispositivo: device.name,
      }
      return Fetcher.post(Url.add, body, true)
        .then(res => Device.validate(res, retry, true))
    })
  }

  static removeDevice = (session, device) => {
    const retry = () => Device.removeDevice(device)
    return session.login().then(_ => {
      const body = {
        mac: device.mac,
      }
      return Fetcher.post(Url.remove, body, true)
        .then(res => Device.validate(res, retry, false))
    })
  }

  static editDevice = (session, deviceOld, deviceNew) => {
    const retry = () => Device.editDevice(deviceOld, deviceNew)
    return session.login().then(() => {
      const body = {
        macAntes: deviceOld.mac,
        macDespues: deviceNew.mac,
        nombreDispositivoAntes: deviceOld.name,
        nombreDispositivoDespues: deviceNew.name,
      }
      deviceNew.active = deviceOld.active
      return Fetcher.post(Url.edit, body, true)
        .then(res => Device.validate(res, retry, deviceNew))
    })
  }
}
