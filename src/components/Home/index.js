import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import Config from 'react-native-config'

const Home = ({devices, user, userUpdate, login, logout}) => (
  <View>
    {Object.keys(user).map(key => <Text key={key}>{`${key}: ${user[key]}`}</Text>)}
    <Button title='Login bad' onPress={() => login({username: 'nope', password: 'wrong'})}/>
    <Button title='Login good' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
    <Button title='Logout' onPress={() => logout()}/>
  </View>
)

Home.propTypes = {
  devices: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}

export default Home
