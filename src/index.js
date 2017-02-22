import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import App from './components/App'
import reducer from './redux'

import * as user from './redux/user'
import * as devices from './redux/devices'

const logger = createLogger()
const store = createStore(reducer, applyMiddleware(logger))

const WifiUC = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
export default WifiUC

store.dispatch(user.login({username: 'test', password: 'pass'}))
store.dispatch(user.logout())
store.dispatch(user.login({username: 'test2', password: 'pass2'}))

store.dispatch(devices.add({mac: 'AA-AA-AA-AA-AA-AA', name: 'device1'}))
store.dispatch(devices.add({mac: 'BB-BB-BB-BB-BB-BB', name: 'device2'}))
store.dispatch(devices.toggle('BB-BB-BB-BB-BB-BB', true))
store.dispatch(devices.remove('AA-AA-AA-AA-AA-AA'))
store.dispatch(devices.editName('BB-BB-BB-BB-BB-BB', 'changed'))
store.dispatch(devices.refresh([
  {
    mac: 'BB-BB-BB-BB-BB-BB',
    name: 'device1',
    active: false
  }, {
    mac: 'CC-CC-CC-CC-CC-CC',
    name: 'device3',
    active: true
  }
]))
