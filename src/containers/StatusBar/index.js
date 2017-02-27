import {connect} from 'react-redux'
import {StatusBar} from 'react-native'
import {networkActivity} from '../../redux/selectors'
import Colors from '../../utils/colors'

const mapStateToProps = (state, ownProps) => {
  return {backgroundColor: Colors.main, barStyle: 'dark-content', networkActivityIndicatorVisible: networkActivity(state)}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(StatusBar)

export default Container
