import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Storage from 'react-native-storage'

import Home from './components/Home'

export const routes = {
  Home: {
    screen: Home
  }
}

const config = {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'Wifi UC',
    header: {}
  }
}

const WifiUC = StackNavigator(routes, config)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
