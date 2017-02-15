import 'react-native'
import React from 'react'
require('isomorphic-fetch')
import Home from './'
import Session from './session'
import {USER, PASS} from 'react-native-dotenv'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('logins', () => {
  const session = new Session(USER, PASS)
  return session.login()
})
