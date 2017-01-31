import React from 'react'
import {View} from 'react-native'
import Base from '../Base'

const navigationOptions = {
  title: 'New'
}

export default class New extends Base {
  static navigationOptions = navigationOptions

  constructor(props) {
    super(props)
    const state = {}
    this.addState(state)
  }

  render() {
    return (
      <View></View>
    )
  }
}
