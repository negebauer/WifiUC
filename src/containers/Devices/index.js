import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import {add, toggleEdit, toggleAdd} from '../../redux/devices'
import {update as newDeviceUpdate, reset as newDeviceReset, showError as newDeviceShowError} from '../../redux/newDevice'
import {devicesList} from '../../redux/selectors'
import Devices from '../../components/Devices'
import Format from '../../utils/format'

const mapStateToProps = (state, ownProps) => {
  const map = {
    devices: devicesList(state),
    loading: state.loading,
    devicesInteract: !state.user.loading && !state.devices.loading,
    editMode: state.devices.editing,
    addMode: state.devices.adding,
    newDevice: state.newDevice
  }
  return map
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(fetchLogout()),
    deviceAdd: device => Format.macValidate(Format.mac(device.mac)) && dispatch(add(device)) && dispatch(newDeviceReset()) || dispatch(newDeviceShowError()),
    toggleEdit: () => dispatch(toggleEdit()),
    toggleAdd: () => dispatch(newDeviceReset()) && dispatch(toggleAdd()),
    newDeviceUpdate: device => dispatch(newDeviceUpdate(device))
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Devices)

export default Container
