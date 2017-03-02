import React, {Component} from 'react'
import {AppRegistry, AsyncStorage} from 'react-native'
import {StackNavigator} from 'react-navigation'
import Storage from 'react-native-storage'

import Home from './components/Home'

const configStorage = {
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
}
const storage = new Storage(configStorage)
global.storage = storage

export const routes = {
  Home: {
    screen: Home
  }
}

const configNavigator = {
  initialRouteName: 'Home',
  navigationOptions: {
    title: 'Wifi UC',
    header: {}
  }
}

const WifiUC = StackNavigator(routes, configNavigator)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
