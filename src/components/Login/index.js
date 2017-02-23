import React from 'react'
import {View, ActivityIndicator, Text, Button} from 'react-native'

const Login = ({user, login}) => (
  <View>
    <Text>{user.username}</Text>
    <Text>{user.password}</Text>
  </View>
)

Login.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired
}

export default Login
