import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {StackNavigator} from 'react-navigation'

import Home from './components/Home'
// import Login from './components/Login'

export const routes = {
  Home: {
    screen: Home
  },
  // Login: {
  //   screen: Login,
  //   path: '/login'
  // }
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
