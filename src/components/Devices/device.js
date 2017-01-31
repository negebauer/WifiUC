export default class Device {
  constructor(mac, name, active = false) {
    this.mac = mac
    this.name = name
    this.active = active
  }

  clean = () => {
    this.active = false
    return this
  }
}
