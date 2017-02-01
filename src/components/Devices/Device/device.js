import Devices from '../devices'

export default class Device {

  constructor(object) {
    const {mac, name, active} = object
    this.mac = mac
    this.name = name
    this.active = active
    this.toggling = false
  }

  clean = () => {
    this.active = false
    return this
  }

  get macFormatted() {
    return this.mac.toUpperCase().match(/.{1,2}/g).join(':')
  }

  toggle = (session) => {
    this.toggling = true
    switch (this.active) {
      case true:
        return Devices.removeDevice(session, this).then(() => {
          this.active = false
          this.toggling = false
          return this
        })
      case false:
        return Devices.addDevice(session, this).then(() => {
          this.active = true
          this.toggling = false
          return this
        })
    }
  }
}
