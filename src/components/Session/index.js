import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Login from '../Login'

class Session extends Component {

  componentWillReceiveProps(nextProps) {
    const {user} = this.props
    const rehydrated = !user.rehydrated && nextProps.user.rehydrated
    if (rehydrated && (!user.username && !user.password)) {
      return this.props.userUpdate({error: 'Ingresa tus credenciales'})
    } else if (rehydrated) {
      this.props.login(nextProps.user)
    }
  }

  render() {
    const {user, login, logout, userUpdate} = this.props
    if (user.loading || !user.rehydrated) {
      return <View style={styles.loading}><ActivityIndicator/></View>
    }
    if (user.error) {
      return <Login user={user} userUpdate={userUpdate} login={login}/>
    }
    return <View style={styles.container}><Button title='Logout' onPress={() => logout()}/>{this.props.children}</View>
  }
}

Session.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  children: React.PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default Session
