import 'react-native'
import React from 'react'
require('isomorphic-fetch')
import Home from './'
import Session from './session'
import {WIFIUC_USER, WIFIUC_PASS} from 'react-native-dotenv'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('logins', () => {
  const session = new Session(WIFIUC_USER, WIFIUC_PASS)
  return session.login().then(session => {
    if (!session) {
      throw {message: 'Could\'t create session'}
    }
  })
})
