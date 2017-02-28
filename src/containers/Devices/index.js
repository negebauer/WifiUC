import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import {devicesList} from '../../redux/selectors'
import Devices from '../../components/Devices'

const mapStateToProps = (state, ownProps) => {
  const map = {
    devices: devicesList(state),
    loading: state.loading
  }
  return map
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Devices)

export default Container
