import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

const WifiUC = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
export default WifiUC
