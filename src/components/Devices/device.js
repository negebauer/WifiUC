export default class Device {

  constructor(object) {
    const {mac, name, active} = object
    this.mac = mac
    this.name = name
    this.active = active
  }

  clean = () => {
    this.active = false
    return this
  }
}
