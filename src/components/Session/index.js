import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Config from 'react-native-config'

class Session extends Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.rehydrated && nextProps.user.rehydrated) {
      this.props.login(nextProps.user).then(() => this.props.user.error && this.showLogin())
    }
  }

  showLogin = () => {
    console.log('SHOW LOGIN')
  }

  render() {
    const {user, login, logout} = this.props
    if (user.loading || !user.rehydrated) {
      return <View style={styles.loading}><ActivityIndicator/></View>
    }
    if (user.error) {
      return (
        <View style={styles.loading}>
          <Text>SOME SHOW LOGIN BUTTON</Text>
          <Button title='Login bad' onPress={() => login({username: 'nope', password: 'wrong'})}/>
          <Button title='Login good' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
          <Button title='Logout' onPress={() => logout()}/>
        </View>
      )
    }
    return <View style={styles.container}>{this.props.children}</View>
  }
}

Session.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
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
