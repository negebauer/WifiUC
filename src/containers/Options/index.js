import {connect} from 'react-redux'
import {fetchLogin, fetchLogout, userUpdate} from '../../redux/user'
import Options from '../../components/Options'

const mapStateToProps = (state, ownProps) => ({
  ready: !state.user.loading && !state.user.error,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Container = connect(mapStateToProps, mapDispatchToProps)(Options)

export default Container
