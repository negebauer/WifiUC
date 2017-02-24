import React from 'react'
import {View, ActivityIndicator, Text, Button, StyleSheet} from 'react-native'
import Config from 'react-native-config'

const Login = ({user, login, userUpdate}) => (
  <View style={styles.container}>
    <Text>AJAJAJAJ</Text>
    <Text>SOME SHOW LOGIN BUTTON</Text>
    <Text>{user.error}</Text>
    <Button title='Login bad' onPress={() => login({username: 'nope', password: 'wrong'})}/>
    <Button title='Login good' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
    <Button title='Logout' onPress={() => logout()}/>
  </View>
)

Login.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  userUpdate: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  }
})

export default Login
