import React from 'react'
import {
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Switch,
  StyleSheet,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Base, {Debug} from '../../Base'
import DeviceManager from '../Device'

const timer = null

export default class Device extends Base {

  constructor(props) {
    super(props)
    const state = {
      error: null
    }
    this.addState(state)
  }

  componentWillUnmount() {
    clearTimeout(timer)
  }

  setToggling = (toggling) => {
    const device = this.props.device
    device.toggling = toggling
    this.props.update(device)
    this.setState({error: null})
  }

  toggle = () => {
    if (!this.props.loaded) {
      return this.toggleError({
        message: 'Aún cargando dispositivos activos'
      }, 2)
    }
    this.setToggling(true)
    this.props.device.toggle(this.props.session).then(this.props.update).catch(this.toggleError)
  }

  toggleError = (error, seconds = 4) => {
    this.setToggling(false)
    this.setState({error: error.message})
    timer = setTimeout(() => this.setState({error: null}), seconds * 1000)
  }

  render() {
    this.logRender('Device')
    const device = this.props.device
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View style={styles.device}>
            <View style={styles.deviceToggle}>
              {!device.toggling && <Icon name={(device.active && 'toggle-on') || 'toggle-off'} onPress={this.toggle} size={30}/>}
              {device.toggling && <ActivityIndicator size='small' style={styles.deviceActivity}/>}
            </View>
            <View style={styles.deviceData}>
              <Text>{device.macFormatted}</Text>
              <Text>{device.name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <Debug state={this.props} name={'Device'} hide/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  device: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  deviceToggle: {
    paddingRight: 6
  },
  deviceActivity: {
    height: 30,
    width: 34,
    marginRight: 1
  },
  deviceData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
})
