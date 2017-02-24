import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import Devices from '../../components/Devices'

const mapStateToProps = (state, ownProps) => {
  return {
    devices: Object.values({
      ...state.devices,
      loading: null,
      error: null
    }).filter(Boolean),
    ready: !state.user.loading && !state.user.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Devices)

export default Container
