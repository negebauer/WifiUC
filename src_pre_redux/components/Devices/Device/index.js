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
import DeviceUtil from './device'

const timer = null

export default class Device extends Base {

  constructor(props) {
    super(props)
    const state = {
      device: this.props.device,
      error: null,
      toggling: false
    }
    this.addState(state)
  }

  componentWillUnmount() {
    clearTimeout(timer)
  }

  componentWillReceiveProps(props) {
    this.setState({device: props.device})
  }

  toggle = () => {
    if (!this.props.loaded) {
      return this.toggleError({
        message: 'Aún cargando dispositivos activos'
      }, 2)
    } else if (this.props.toggling) {
      const detail = (this.props.active && 'activandose') || 'desactivandose'
      return this.setState({error: `Dispositivo ${detail}`})
    }
    this.setState({
      toggling: true
    }, () => DeviceUtil.toggle(this.props.session, this.state.device).then(this.toggleSuccess).catch(this.toggleError))
  }

  toggleSuccess = active => {
    const device = this.state.device
    device.active = active
    this.setState({device, toggling: false})
  }

  toggleError = (error, seconds = 4) => {
    this.setState({toggling: false, error: error.message})
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
              {!this.state.toggling && <Icon name={(this.state.device.active && 'toggle-on') || 'toggle-off'} onPress={this.toggle} size={30}/>}
              {this.state.toggling && <ActivityIndicator size='small' style={styles.deviceActivity}/>}
            </View>
            <View style={styles.deviceData}>
              <Text>{this.state.device.name}</Text>
              <Text>{DeviceUtil.formattedMac(this.state.device.mac)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <Debug state={this.state} name={'Device'} hide/>
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
