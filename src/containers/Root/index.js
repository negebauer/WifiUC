import {connect} from 'react-redux'
import {userUpdate} from '../../redux/user'
import App from '../../components/App'

const mapStateToProps = (state, ownProps) => {
  return {devices: state.devices, user: state.user}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userUpdate: user => dispatch(userUpdate(user))
  }
}

const Root = connect(mapStateToProps, mapDispatchToProps)(App)

export default Root
