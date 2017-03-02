import {connect} from 'react-redux'
import {StatusBar} from 'react-native'
import {networkActivity} from '../../redux/selectors'
import Colors from '../../utils/colors'

const mapStateToProps = (state, ownProps) => {
  const map = {
    backgroundColor: Colors.main,
    barStyle: 'light-content',
    networkActivityIndicatorVisible: networkActivity(state)
  }
  return map
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(StatusBar)

export default Container
