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
    DevicesManager.loadDevicesLocal().then(devices => this.setState({
      devices
    }, this.loadDevicesRemote)).catch(this.loadDevicesRemote)
  }

  loadDevicesRemote = () => {
    DevicesManager.loadDevicesRemote(this.props.session).then(activeDevices => {
      const devicesOld = this.state.devices
      const macs = activeDevices.map(d => d.mac)
      const notActive = (d) => macs.indexOf(d.mac) === -1
      const devices = activeDevices.concat(devicesOld.filter(notActive))
      this.setState({
        devices,
        loaded: true,
        error: ''
      }, () => DevicesManager.saveDevices(devices))
    }).catch(error => this.setState({error: error.message}))
  }

  addDevice = (device) => {
    const devices = this.state.devices
    console.log('devices')
    console.log(devices)
    devices.push(device)
    this.setState({
      devices
    }, () => DevicesManager.saveDevice(device))
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
        {this.state.loaded && <Options style={styles.messages} devices={this.state.devices} addDevice={this.addDevice}/>}
        <View style={styles.separator}/>
        <View>
          {this.state.devices.map(device => <Device key={device.mac} device={device} session={this.props.session} loaded={this.state.loaded}/>)}
        </View>
        <Debug state={this.state} name='Devices'/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  separator: {
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
