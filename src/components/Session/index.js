import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Login from '../Login'
import Loading from './Loading'

class Session extends Component {

  componentWillReceiveProps(nextProps) {
    const {user} = this.props
    const rehydrated = !user.rehydrated && nextProps.user.rehydrated
    if (rehydrated && (!nextProps.user.username && !nextProps.user.password)) {
      return this.props.userUpdate({username: '', password: '', error: 'Ingresa tus credenciales'})
    } else if (rehydrated) {
      this.props.login(nextProps.user)
    }
  }

  render() {
    const {user, login, logout, userUpdate} = this.props
    if (user.loading || !user.rehydrated) {
      return <Loading/>
    }
    if (user.error) {
      return <Login user={user} userUpdate={userUpdate} login={login}/>
    }
    return <View style={styles.container}>{this.props.children}</View>
  }
}

Session.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  children: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Session
