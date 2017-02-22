import Project from './project'

export default class Fetcher {
  static headers = form => {
    if (!form) {
      return {'Content-Type': 'application/json'}
    }
    return {'Content-Type': 'application/x-www-form-urlencoded'}
  }

  static get(path, form = false) {
    if (Project.isDev) {
      console.log(`GET ${path}`)
      console.log('headers')
      console.log(Fetcher.headers(form))
    }
    return fetch(path, {headers: Fetcher.headers(form)})
  }

  static post(path, body = {}, form = false) {
    if (Project.isDev) {
      console.log(`POST ${path}`)
      console.log('body')
      console.log(Fetcher.body(form, body))
      console.log('headers')
      console.log(Fetcher.headers(form))
    }
    return fetch(path, {
      method: 'POST',
      headers: Fetcher.headers(form),
      body: Fetcher.body(form, body)
    })
  }

  static body(form = false, body = {}) {
    if (!form) {
      return JSON.stringify(body)
    }
    return Fetcher.formBody(body)
  }

  static formBody(body) {
    const formBodyData = []
    Object.keys(body).forEach(key => {
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(body[key])
      formBodyData.push(encodedKey + '=' + encodedValue)
    })
    return formBodyData.join('&')
  }
}
