import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Config from 'react-native-config'

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.rehydrated && nextProps.user.rehydrated) {
      this.props.login(nextProps.user).catch(err => this.showLogin())
    }
  }

  showLogin = () => {
    console.log('SHOW LOGIN')
  }

  render() {
    const {devices, user, userUpdate, login, logout} = this.props
    if (user.loading) {
      return <View style={styles.containerCentered}><ActivityIndicator/></View>
    }
    if (user.error) {
      return <View style={styles.container}>
        <Text>YOU SHOULD LOGIN</Text>
        <Button title='Login good' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
      </View>
    }
    return (
      <View style={styles.container}>
        {Object.keys(user).map(key => <Text key={key}>{`${key}: ${user[key]}`}</Text>)}
        <Button title='Login bad' onPress={() => login({username: 'nope', password: 'wrong'})}/>
        <Button title='Login good' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
        <Button title='Logout' onPress={() => logout()}/>
      </View>
    )
  }
}

Home.propTypes = {
  devices: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default Home
