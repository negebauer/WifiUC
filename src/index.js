import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import App from './components/App'
import reducer from './redux'

import * as user from './redux/user'

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
store.dispatch(user.login({username: 'test2', password: 'pass2'}))
store.dispatch(user.logout({username: 'test2', password: 'pass2'}))
console.log(user)
