import * as Keychain from 'react-native-keychain'
let cheerio = require('cheerio')

import Url from './url'
import Fetcher from './fetcher'

export default class Session {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  static exists = (callback) => {
    Keychain.getGenericPassword().then(credentials => {
      callback(credentials.username, credentials.password, !credentials.password)
    })
  }

  login = () => {
    return new Promise((resolve, reject) => {
      const render = (logged = true, text = '') => {
        Fetcher.post(Url.render).then(response => {
          resolve(logged, text)
        })
      }
      Fetcher.get(Url.login, true).then(response => {
        if (response.url === Url.logged) {
          return render()
        }
        response.text().then(html => {
          console.log('RESPONSE Fetcher.get(Url.login, true)')
          console.log({html})
          if (!html) {
            return reject('No se pudo conectar')
          } else if (html.split('<input type="hidden" name="execution"').length === 1) {
            return render()
          }
          const getParam = (param) => html.split(`<input type="hidden" name="${param}" value="`)[1].split('" />')[0]
          const body = {
            username: this.username,
            password: this.password,
            lt: getParam('lt'),
            execution: getParam('execution'),
            _eventId: getParam('_eventId')
          }
          Fetcher.post(Url.login, body, true).then(response => {
            response.text().then(html => {
              console.log('Login response')
              console.log(html)
              if (html.indexOf('CAS') !== -1) {
                return this.login().then(resolve).catch(reject)
              }
              const string = 'Comunidad UC'
              const logged = html.indexOf(string) !== -1
              let text = ''
              if (!logged) {
                text = 'Falló login. Revisa tus credenciales e intenta de nuevo'
              }
              render(logged, text)
            }).catch(error => {
              console.log('ERROR: response.text()')
              console.log(error)
              reject(error)
            })
          }).catch(error => reject(error))
        }).catch(error => {
          console.log('ERROR: Url.login response.text()')
          console.log(error)
          reject(error)
        })
      })
    })
  }

  loadDevices = () => {
    return new Promise((resolve, reject) => {
      return this.login().then(logged => {
        Fetcher.post(Url.getMacList).then(response => {
          response.text().then(html => {
            if (html.split('listaRegMac').length === 1) {
              console.log('retry')
              return this.loadDevices()
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
            resolve(devices)
          })
        }).catch(error => reject(error))
      }).catch(error => reject(error))
    })
  }

  validate = (response, retry) => {
    return new Promise((resolve, reject) => {
      response.text().then(html => {
        console.log('RESPONSE BODY')
        console.log(html)
        let $ = cheerio.load(html)
        if (!$('.exito').length) {
          if (html.indexOf('CAS') !== -1) {
            return retry().then(resolve).catch(reject)
          }
          return reject($('.error').text())
        }
        resolve()
      })
    })
  }

  addDevice = (device) => {
    const retry = () => this.addDevice(device)
    return this.login().then(_ => {
      const body = {
        mac: device.mac,
        nombreDispositivo: device.name
      }
      return Fetcher.post(Url.add, body, true).then(res => this.validate(res, retry))
    })
  }

  editDevice = (deviceOld, deviceNew) => {
    const retry = () => this.editDevice(deviceOld, deviceNew)
    return this.login().then(_ => {
      const body = {
        macAntes: deviceOld.mac,
        macDespues: deviceNew.mac,
        nombreDispositivoAntes: deviceOld.name,
        nombreDispositivoDespues: deviceNew.name
      }
      return Fetcher.post(Url.edit, body, true).then(res => this.validate(res, retry))
    })
  }

  removeDevice = (device) => {
    const retry = () => this.removeDevice(device)
    return this.login().then(_ => {
      const body = {
        mac: device.mac
      }
      return Fetcher.post(Url.remove, body, true).then(res => this.validate(res, retry))
    })
  }
}
