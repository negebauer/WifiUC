export default class Format {
  static capitalize = string => string.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase()
  })

  static cleanUsername = username => {
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
}
