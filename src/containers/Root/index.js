import {connect} from 'react-redux'
import {login, userUpdate} from '../../redux/user'
import Home from '../../components/Home'

const mapStateToProps = (state, ownProps) => {
  return {devices: state.devices, user: state.user}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userUpdate: user => dispatch(userUpdate(user)),
    login: user => dispatch(login(user))
  }
}

const Root = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Root
