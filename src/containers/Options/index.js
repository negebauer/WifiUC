import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import Options from '../../components/Options'

const mapStateToProps = (state, ownProps) => {
  const map = {
    ready: !state.user.loading && !state.user.error
  }
  return map
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Options)

export default Container
