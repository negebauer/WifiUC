import {connect} from 'react-redux'
import {StatusBar} from 'react-native'
import {networkActivity} from '../../redux/selectors'
import Colors from '../../utils/colors'

const mapStateToProps = (state, ownProps) => ({
  backgroundColor: Colors.main,
  barStyle: 'light-content',
  networkActivityIndicatorVisible: networkActivity(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Container = connect(mapStateToProps, mapDispatchToProps)(StatusBar)

export default Container
