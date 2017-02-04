import React from 'react'
import {ScrollView, StyleSheet, ActivityIndicator, Text, View} from 'react-native'
import Base, {Debug} from '../Base'
import Device from './Device'
import Options from './Options'
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

  loadDevicesLocal = () => {
    DevicesManager.loadLocal().then(devices => this.setState({
      devices: devices.map(d => d.clean())
    }, this.loadDevicesRemote)).catch(this.loadDevicesRemote)
  }

  loadDevicesRemote = () => {
    DevicesManager.loadRemote(this.props.session).then(activeDevices => {
      const devicesOld = this.state.devices
      const macs = activeDevices.map(d => d.mac)
      const notActive = (d) => macs.indexOf(d.mac) === -1
      const devices = activeDevices.concat(devicesOld.filter(notActive))
      DevicesManager.save(devices)
      this.setState({devices, loaded: true, error: ''})
    }).catch(error => this.setState({error: error.message}))
  }

  saveDevices = () => {
    DevicesManager.save(this.state.devices)
  }

  updateDevice = (device) => {
    const devices = this.state.devices
    devices[devices.map(d => d.mac).indexOf(device.mac)] = device
    this.saveDevices(devices)
    this.setState({
      devices
    }, this.saveDevices)
  }

  render() {
    this.logRender('Devices')
    return (
      <ScrollView>
        {!this.state.loaded && <View style={styles.messages}>
          <View style={styles.loading}>
            <ActivityIndicator style={styles.loadingSpinner}/>
            <Text>Cargando dispositivos</Text>
          </View>
        </View>}
        {this.state.loaded && <Options style={styles.messages}/>}
        <View>
          {this.state.devices.map(device => <Device key={device.mac} device={device} update={this.updateDevice} session={this.props.session} loaded={this.state.loaded}/>)}
        </View>
        <Debug state={this.state} name='Devices'/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  messages: {
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 0.5,
    paddingBottom: 16
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loadingSpinner: {
    marginRight: 6
  }
})
