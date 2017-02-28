import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import {toggleEdit} from '../../redux/devices'
import {devicesList} from '../../redux/selectors'
import Devices from '../../components/Devices'

const mapStateToProps = (state, ownProps) => {
  const map = {
    devices: devicesList(state),
    loading: state.loading,
    devicesInteract: !state.user.loading && !state.devices.loading
  }
  return map
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(fetchLogout()),
    toggleEdit: () => dispatch(toggleEdit())
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Devices)

export default Container
