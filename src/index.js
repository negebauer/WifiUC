import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import Root from './containers/Root'
import reducer from './redux'

import * as user from './redux/user'
import * as devices from './redux/devices'
import * as newDevice from './redux/newDevice'

const loggerMiddleware = createLogger()
const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))

const WifiUC = () => (
  <Provider store={store}>
    <Root/>
  </Provider>
)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
export default WifiUC

const login = store.dispatch(user.login({username: 'test', password: 'pass'})).then(console.log('LOGIN FINISHED')).catch(err => {
  console.log('LOGIN FAILED')
  console.log(err)
})
//
// console.log('login')
// console.log(login)
