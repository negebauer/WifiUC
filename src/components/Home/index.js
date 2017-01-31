import React from 'react'
import {View, Text, Button} from 'react-native'
import Base from '../Base'
import Login from '../Login'

const navigationOptions = {
  title: 'Wifi UC',
  header: {
    right: <Button title='aja'/>
  }
}

export default class Home extends Base {
  static navigationOptions = navigationOptions

  constructor(props) {
    super(props)
    const state = {
      login: false
    }
    this.addState(state)
  }

  render() {
    if (this.state.login) {
      return <Login/>
    }
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button onPress={() => this.navigate('Login')} title='Chat with Lucy'/>
      </View>
    )
  }
}
