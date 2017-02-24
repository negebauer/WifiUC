import React from 'react'
import {AsyncStorage, AppRegistry} from 'react-native'
import {compose, applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import App from './components/App'
import reducer from './redux'

const loggerMiddleware = createLogger()
const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware), autoRehydrate())
const store = createStore(reducer, undefined, enhancer)
persistStore(store, {storage: AsyncStorage})

const WifiUC = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

AppRegistry.registerComponent('WifiUC', () => WifiUC)
export default WifiUC
