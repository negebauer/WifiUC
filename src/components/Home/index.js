import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import Config from 'react-native-config'

const Home = ({devices, user, userUpdate, login}) => (
  <View>
    {Object.keys(user).map(key => <Text key={key}>{`${key}: ${user[key]}`}</Text>)}
    <Button title='Change user' onPress={() => userUpdate({username: 'AJA', password: 'pass'})}/>
    <Button title='Login' onPress={() => login({username: Config.WIFIUC_USER, password: Config.WIFIUC_PASS})}/>
  </View>
)

Home.propTypes = {
  devices: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired
}

export default Home
