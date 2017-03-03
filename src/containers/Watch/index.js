import {connect} from 'react-redux'
import {fetchToggle, fetchRefresh} from '../../redux/devices'
import {devicesList, devicesState} from '../../redux/selectors'
import Watch from '../../components/Watch'

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  devicesList: devicesList(state),
  devicesState: devicesState(state),
  devices: state.devices,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  deviceToggle: (user, device) => dispatch(fetchToggle(user, device)),
  devicesRefresh: user => dispatch(fetchRefresh(user)),
})

const Container = connect(mapStateToProps, mapDispatchToProps)(Watch)

export default Container
