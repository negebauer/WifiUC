import * as Keychain from 'react-native-keychain'
let cheerio = require('cheerio')

import Url from './url'
import Fetcher from './fetcher'

export const err = {
  network: 0,
  credentials: 1
}

export default class Session {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  static load = () => {
    return Keychain.getGenericPassword().then(credentials => {
      const {username, password} = credentials
      if (!username || !password) {
        return null
      }
      return new Session(credentials.username, credentials.password)
    })
  }

  static save = (username, password) => {
    return Keychain.setGenericPassword(username, password)
  }

  static logout = () => Fetcher.post(Url.logout) && Keychain.resetGenericPassword()

  login = () => {
    return this.loginCredentialsGenerate()
  }

  loginCredentialsGenerate = () => {
    return Fetcher.get(Url.login, true).then(response => {
      console.log('loginCredentialsGenerate')
      console.log(response)
      if (response.url === Url.logged) {
        return this.loginRender()
      }
      return response.text().then(this.loginCredentialsParse)
    })
  }

  loginCredentialsParse = (html) => {
    // Let's look for the credentials
    console.log('loginCredentialsParse')
    console.log(html)
    if (!html) {
      throw {message: 'No se pudo conectar\nRevisa tu conexión a internet', id: err.network}
    } else if (html.indexOf('Session Expired') !== -1) {
      return this.login()
    }
    const getParam = (param) => html.split(`<input type="hidden" name="${param}" value="`)[1].split('" />')[0]
    const body = {
      username: this.username,
      password: this.password,
      lt: getParam('lt'),
      execution: getParam('execution'),
      _eventId: getParam('_eventId')
    }
    return this.loginPost(body)
  }

  loginPost = (body) => {
    return Fetcher.post(Url.login, body, true).then(response => {
      console.log('loginPost')
      console.log(response)
      return response.text().then(this.loginPostParse)
    })
  }

  loginPostParse = (html) => {
    console.log('loginPostParse')
    console.log(html)
    if (html.indexOf('UC Authentication Service') !== -1) {
      throw {message: 'No se pudo conectar\nRevisa tus credenciales', id: err.credentials}
    }
    return this.loginRender()
  }

  loginRender = () => {
    return Fetcher.post(Url.render)
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
}
