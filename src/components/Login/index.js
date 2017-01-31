import React from 'react'
import {Modal, Text} from 'react-native'
import Base from '../Base'

const navigationOptions = {
  title: 'Login'
}

export default class Login extends Base {
  static navigationOptions = navigationOptions

  render() {
    return (
      <Modal>
        <Text>AJA</Text>
      </Modal>
    )
  }
}
