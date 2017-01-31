import React from 'react'
import {View} from 'react-native'
import Base, {Styles, Debug} from '../Base'
import DevicesManager from './devices'

export default class Devices extends Base {
  constructor(props) {
    super(props)
    const state = {
      devices: [],
      loaded: false
    }
    this.addState(state)
    this.loadDevicesLocal()
  }

  get session() {
    return this.props.session
  }

  loadDevicesLocal = () => {
    DevicesManager.loadLocal().then(devices => this.setState({
      devices
    }, this.loadDevicesRemote)).catch(this.loadDevicesRemote)
  }

  loadDevicesRemote = () => {
    DevicesManager.loadRemote(this.session).then(activeDevices => {
      const devicesOld = this.state.devices.map(d => d.clean())
      const macs = activeDevices.map(d => d.mac)
      const notActive = (d) => macs.indexOf(d.mac) === -1
      const devices = activeDevices.concat(devicesOld.filter(notActive))
      DevicesManager.save(devices)
      this.setState({devices: devices, loaded: true, error: ''})
    }).catch(error => this.setState({error: error.message}))
  }

  render() {
    this.logRender('Devices')
    return (
      <View>
        <Debug state={this.state} name='Devices'/>
      </View>
    )
  }
}
