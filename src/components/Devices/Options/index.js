import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import FormHelper from 'tcomb-form-native'
import Base, {Debug} from '../../Base'

const macRe = /^(?!(?:ff:ff:ff:ff:ff:ff|00:00:00:00:00:00))(?:[\da-f]{2}:){5}[\da-f]{2}$/i
const Form = FormHelper.form.Form
const Mac = FormHelper.refinement(FormHelper.String, macRaw => {
  const mac = macRaw.replace(/[&\/\\:-]/g, '').toLowerCase()
  const macArray = mac.match(/.{1,2}/g)
  const macComplete = macArray.join(':')
  console.log(macComplete)
  return macRe.test(macComplete)
})
DeviceStruct = {
  name: FormHelper.String,
  mac: Mac
}
const Device = FormHelper.struct(DeviceStruct)
const formOptions = {
  fields: {
    name: {
      label: 'Nombre',
      autoCapitalize: 'sentences',
      autoCorrect: false,
      error: 'Falta nombre'
    },
    mac: {
      label: 'MAC',
      autoCorrect: false,
      autoCapitalize: 'none',
      error: 'Mac no válido'
    }
  }
}

export default class Options extends Base {

  constructor(props) {
    super(props)
    const state = {
      adding: false,
      device: {
        mac: '',
        name: ''
      }
    }
    this.addState(state)
  }

  onDeviceChange = (device) => this.setState({device})

  addDevice = () => {
    let device = this.refs.form.getValue()
    if (!device) {
      return this.setState({text: 'Faltan datos'})
    }
    this.props.addDevice(device)
    this.setState({adding: false, device: {}})
  }

  render() {
    if (this.state.adding) {
      return (
        <View style={styles.container}>
          <Form ref='form' type={Device} options={formOptions} value={this.state.device} onChange={this.onDeviceChange}/>
          <View style={styles.formButtons}>
            <Button title='Cancelar' onPress={() => this.setState({adding: false, device: {}})}/>
            <Button title='Guardar' onPress={this.addDevice}/>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text onPress={() => this.setState({adding: true})}>Agregar dispositivo</Text>
        <Debug state={this.state} name='Options' hide/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'stretch'
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
