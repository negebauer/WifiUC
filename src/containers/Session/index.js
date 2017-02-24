import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, update} from '../../redux/user'
import Session from '../../components/Session'

const mapStateToProps = (state, ownProps) => {
  return {user: state.user}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userUpdate: user => dispatch(update(user)),
    login: user => dispatch(fetchLogin(user)),
    logout: () => dispatch(fetchLogout())
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Session)

export default Container
