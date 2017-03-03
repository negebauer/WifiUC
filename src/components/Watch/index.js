import React, {Component} from 'react'
import * as watch from 'react-native-watch-connectivity'

/* Messages */
const RELOAD_DEVICES = 'RELOAD_DEVICES'
const TOGGLE_DEVICE = 'TOGGLE_DEVICE'

class Watch extends Component {
  componentDidMount() {
    this.subscriptions = [
      watch.subscribeToMessages(this.receivedMessage),
      // watch.subscribeToWatchState(null),
      // watch.subscribeToWatchReachability(null),
      // watch.subscribeToUserInfo(null),
      // watch.subscribeToApplicationContext(null),
    ]
  }

  componentDidUpdate(prevProps, prevState) {
    if (!watch) return
    const message = {
      user: this.props.user,
      devicesList: this.props.devicesList,
      devicesState: this.props.devicesState,
    }
    watch.sendMessage(message, (err, replyMessage) => {})
  }

  componentWillUnmount() {
    this.subscriptions.forEach(fn => fn())
  }

  applicationContext = () => {}

  receivedMessage = (err, message, reply) => {
    console.log('Received message')
    console.log(message)
    switch (message.type) {
      case TOGGLE_DEVICE:
        this.props.deviceToggle(
          this.props.user,
          this.props.devices[message.mac.toLowerCase()],
        )
      case RELOAD_DEVICES:
        !this.props.devicesState.loading &&
          this.props.devicesRefresh(this.props.user)
      default:
        break
    }
  }

  render = () => null
}

Watch.propTypes = {
  user: React.PropTypes.object.isRequired,
  devices: React.PropTypes.object.isRequired,
  devicesList: React.PropTypes.array.isRequired,
  devicesState: React.PropTypes.object.isRequired,
  deviceToggle: React.PropTypes.func.isRequired,
  devicesRefresh: React.PropTypes.func.isRequired,
}

export default Watch
