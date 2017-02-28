import React, {Component} from 'react'
import {View, ScrollView, Text, ActivityIndicator, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'apsl-react-native-button'
import FormHelper from 'tcomb-form-native'
import Format from '../../utils/format'
import Colors from '../../utils/colors'

const Option = props => (
  <Icon size={16} style={styles.option} {...props}>{props.children}</Icon>
)

Option.propTypes = {
  children: React.PropTypes.any
}

const Form = FormHelper.form.Form
DeviceStruct = {
  name: FormHelper.String,
  mac: FormHelper.String
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

const AddDevice = ({newDevice, newDeviceUpdate, deviceAdd, toggleAdd}) => (
  <View style={styles.addDevice}>
    <Form type={Device} options={formOptions} value={newDevice} onChange={newDeviceUpdate}/>
    <Button style={styles.newDeviceButton} onPress={() => deviceAdd(newDevice)}>Agregar</Button>
    <Button style={styles.newDeviceButtonCancel} onPress={toggleAdd}>Cancelar</Button>
    <Text style={styles.newDeviceMessage}>{newDevice.showError && newDevice.error}</Text>
  </View>
)

AddDevice.propTypes = {
  newDevice: React.PropTypes.object.isRequired,
  newDeviceUpdate: React.PropTypes.func.isRequired,
  deviceAdd: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired
}

const Devices = ({
  devices,
  deviceAdd,
  devicesInteract,
  toggleEdit,
  toggleAdd,
  editMode,
  addMode,
  logout,
  newDevice,
  newDeviceUpdate
}) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>Dispositivos</Text>
      {!editMode && !addMode && <View style={styles.options}>
        <Option name='refresh' onPress={() => {}}/>
        <Option name='plus' onPress={toggleAdd}/>
        <Option name='edit' onPress={toggleEdit}/>
        <Option name='sign-out' onPress={logout}/>
      </View>}
      {(editMode || addMode) && <View style={styles.options}>
        {editMode && <Option name='check' onPress={toggleEdit}/>}
        {addMode && <Option name='ban' onPress={toggleAdd}/>}
      </View>}
    </View>
    {!addMode && <ScrollView style={styles.devices}>
      {devices.map(device => (
        <View key={device.mac}>
          <Text key={device.mac}>{`Mac: ${device.mac} Name: ${device.name}`}</Text>
        </View>
      ))}
    </ScrollView>}
    {addMode && <AddDevice {...{newDevice, newDeviceUpdate,deviceAdd, toggleAdd}}/>}
  </View>
)

Devices.propTypes = {
  devices: React.PropTypes.array.isRequired,
  deviceAdd: React.PropTypes.func.isRequired,
  devicesInteract: React.PropTypes.bool.isRequired,
  toggleEdit: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  addMode: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  newDevice: React.PropTypes.object.isRequired,
  newDeviceUpdate: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  option: {
    padding: 12,
    color: 'gray'
  },
  devices: {
    flex: 1
  },
  addDevice: {
    flex: 1,
    paddingTop: 12
  },
  newDeviceButton: {
    borderColor: Colors.main
  },

  newDeviceButtonCancel: {
    borderColor: 'red'
  },
  newDeviceMessage: {
    marginTop: 12,
    textAlign: 'center',
    color: 'red'
  }
})

export default Devices
