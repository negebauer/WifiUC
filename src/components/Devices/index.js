import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from 'apsl-react-native-button'
import FormHelper from 'tcomb-form-native'
import Format from '../../utils/format'
import Colors from '../../utils/colors'

const Option = props => (
  <Icon size={16} style={styles.option} {...props}>{props.children}</Icon>
)

Option.propTypes = {
  children: React.PropTypes.any,
}

const Form = FormHelper.form.Form
FormDeviceStruct = {
  name: FormHelper.String,
  mac: FormHelper.String,
}
const FormDevice = FormHelper.struct(FormDeviceStruct)
const formOptions = {
  fields: {
    name: {
      label: 'Nombre',
      autoCapitalize: 'sentences',
      autoCorrect: false,
      error: 'Falta nombre',
    },
    mac: {
      label: 'MAC',
      autoCorrect: false,
      autoCapitalize: 'none',
      error: 'Mac no válido',
    },
  },
}

const AddDevice = ({newDevice, newDeviceUpdate, deviceAdd, toggleAdd}) => (
  <View style={styles.addDevice}>
    <Form
      type={FormDevice}
      options={formOptions}
      value={newDevice}
      onChange={newDeviceUpdate}
    />
    <Button style={styles.newDeviceButton} onPress={() => deviceAdd(newDevice)}>
      Agregar
    </Button>
    <Button style={styles.newDeviceButtonCancel} onPress={toggleAdd}>
      Cancelar
    </Button>
    <Text style={styles.newDeviceMessage}>
      {newDevice.showError && newDevice.error}
    </Text>
  </View>
)

AddDevice.propTypes = {
  newDevice: React.PropTypes.object.isRequired,
  newDeviceUpdate: React.PropTypes.func.isRequired,
  deviceAdd: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired,
}

const Device = ({name, mac, active, loading, error, toggle, index}) => (
  <View>
    <TouchableWithoutFeedback onPress={toggle}>
      <View style={(index % 2 === 0 && styles.device) || styles.device2}>
        <View style={styles.deviceToggle}>
          {!loading &&
            <Icon
              name={(active && 'toggle-on') || 'toggle-off'}
              onPress={toggle}
              size={30}
            />}
          {loading &&
            <ActivityIndicator size="small" style={styles.deviceActivity} />}
        </View>
        <View style={styles.deviceData}>
          <Text>{name}</Text>
          <Text>{Format.mac(mac).toUpperCase()}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
    {(error && <Text style={styles.deviceError}>{error}</Text>) || null}
  </View>
)

Device.propTypes = {
  name: React.PropTypes.string.isRequired,
  mac: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string.isRequired,
  toggle: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired,
}

const DeviceEdit = ({name, mac, active, loading, error, index, remove}) =>
  (!active &&
    <View>
      <TouchableWithoutFeedback>
        <View
          style={(index % 2 === 0 && styles.deviceEdit) || styles.deviceEdit2}
        >
          <View style={styles.deviceEditData}>
            <Text>{name}</Text>
            <Text>{Format.mac(mac).toUpperCase()}</Text>
          </View>
          <View style={styles.deviceEditOptions}>
            <Option name="edit" onPress={null} />
            <Option name="ban" onPress={() => remove(mac)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {(error && <Text style={styles.deviceError}>{error}</Text>) || null}
    </View>) ||
  null

DeviceEdit.propTypes = {
  name: React.PropTypes.string.isRequired,
  mac: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  remove: React.PropTypes.func.isRequired,
}

const Devices = (
  {
    devices,
    deviceAdd,
    devicesInteract,
    devicesRefresh,
    toggleEdit,
    toggleAdd,
    editMode,
    addMode,
    logout,
    newDevice,
    newDeviceUpdate,
    loading,
    error,
    toggle,
    remove,
  },
) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>Dispositivos</Text>
      {!editMode &&
        !addMode &&
        <View style={styles.options}>
          <Option name="refresh" onPress={() => !loading && devicesRefresh()} />
          <Option name="plus" onPress={toggleAdd} />
          <Option name="edit" onPress={toggleEdit} />
          <Option name="sign-out" onPress={logout} />
        </View>}
      {(editMode || addMode) &&
        <View style={styles.options}>
          {editMode && <Option name="check" onPress={toggleEdit} />}
          {addMode && <Option name="ban" onPress={toggleAdd} />}
        </View>}
    </View>
    {((loading || error) &&
      <View style={styles.devicesMessage}>
        {(loading &&
          <View style={styles.devicesMessageLoading}>
            <ActivityIndicator style={styles.devicesMessageLoadingItem} />
            <Text style={styles.devicesMessageLoadingItem}>
              Cargando dispositivos...
            </Text>
          </View>) ||
          null}
        {(error &&
          <View style={styles.devicesMessageError}>
            <Text>{error}</Text>
          </View>) ||
          null}
      </View>) ||
      null}
    {!addMode &&
      <ScrollView style={styles.devices}>
        {devices.map(
          (device, index) =>
            (!editMode &&
              <Device
                key={device.mac}
                {...device}
                index={index}
                toggle={() => !loading && !device.loading && toggle(device)}
              />) ||
            <DeviceEdit
              key={device.mac}
              {...device}
              index={index}
              remove={remove}
            />,
        )}
      </ScrollView>}
    {addMode &&
      <AddDevice {...{newDevice, newDeviceUpdate, deviceAdd, toggleAdd}} />}
  </View>
)

Devices.propTypes = {
  devices: React.PropTypes.array.isRequired,
  deviceAdd: React.PropTypes.func.isRequired,
  devicesInteract: React.PropTypes.bool.isRequired,
  devicesRefresh: React.PropTypes.func.isRequired,
  toggleEdit: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  addMode: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  newDevice: React.PropTypes.object.isRequired,
  newDeviceUpdate: React.PropTypes.func.isRequired,
  error: React.PropTypes.string.isRequired,
  toggle: React.PropTypes.func.isRequired,
  remove: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  option: {
    padding: 12,
    color: 'gray',
  },
  devices: {
    flex: 1,
  },
  addDevice: {
    flex: 1,
    paddingTop: 12,
  },
  newDeviceButton: {
    borderColor: Colors.main,
  },

  newDeviceButtonCancel: {
    borderColor: 'red',
  },
  newDeviceMessage: {
    marginTop: 12,
    textAlign: 'center',
    color: 'red',
  },
  deviceError: {
    color: 'red',
    textAlign: 'center',
  },
  device: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'black',
  },
  device2: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'black',
    borderRadius: 80,
    backgroundColor: Colors.mainClear,
  },
  deviceToggle: {
    paddingRight: 6,
  },
  deviceActivity: {
    height: 30,
    width: 34,
    marginRight: 1,
  },
  deviceData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  devicesMessage: {},
  devicesMessageLoading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  devicesMessageLoadingItem: {
    margin: 5,
  },
  devicesMessageError: {},
  deviceEdit: {
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  deviceEdit2: {
    padding: 12,
    justifyContent: 'space-between',
    borderRadius: 80,
    backgroundColor: Colors.mainClear,
    flexDirection: 'row',
  },
  deviceEditData: {
    flexDirection: 'column',
  },
  deviceEditOptions: {
    flexDirection: 'row',
  },
})

export default Devices
