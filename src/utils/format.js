export default class Format {
  static capitalize = (string) => string.replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase()
  })
}
