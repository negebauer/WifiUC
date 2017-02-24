export default class Format {
  static capitalize = string => string.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase()
  })

  static cleanUsername = username => {
    if (!username) {
      return username
    }
    const ucSuffix = '@uc.cl'
    const index = username.indexOf(ucSuffix, username.length - ucSuffix.length)
    if (index !== -1) {
      return username.substr(0, index)
    }
    return username
  }

  static mac = macRaw => {
    const mac = macRaw.replace(/[&\/ \\:-]/g, '').toLowerCase()
    const macArray = mac.match(/.{1,2}/g)
    return macArray.join(':')
  }

  /* Assumes Format.mac() format */
  static macValidate = mac => {
    const regex = /^(?!(?:ff:ff:ff:ff:ff:ff|00:00:00:00:00:00))(?:[\da-f]{2}:){5}[\da-f]{2}$/i
    return regex.test(mac.toLowerCase())
  }
}
