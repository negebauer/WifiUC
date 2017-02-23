import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'

const Home = ({devices, user, userUpdate}) => (
  <View>
    <Text>{`username: ${user.username}`}</Text>
    <Text>{`password: ${user.password}`}</Text>
    <Button title='Change user' onPress={() => userUpdate({username: 'AJA', password: 'pass'})}/>
  </View>
)

Home.propTypes = {
  devices: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  userUpdate: React.PropTypes.func.isRequired
}

export default Home
