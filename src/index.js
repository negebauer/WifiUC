import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import App from './components/App'
import reducer from './reducers'

import * as actions from './actions'

const logger = createLogger()
const store = createStore(reducer, applyMiddleware(logger))

const WifiUC = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
export default WifiUC

store.dispatch(actions.login({username: 'test', password: 'pass'}))
console.log(actions)
