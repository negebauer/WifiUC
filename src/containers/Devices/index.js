import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import {devicesList} from '../../redux/selectors'
import Devices from '../../components/Devices'

const mapStateToProps = (state, ownProps) => {
  return {
    devices: devicesList(state),
    ready: !state.user.loading && !state.user.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Devices)

export default Container
