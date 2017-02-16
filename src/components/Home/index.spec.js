import 'react-native'
import React from 'react'
require('isomorphic-fetch')
import Home from './'
import Session from './session'
import Config from 'react-native-config'
import * as Keychain from 'react-native-keychain'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

let session = new Session(Config.WIFIUC_USER, Config.WIFIUC_PASS)

beforeEach(() => {
  return Session.logout()
})

it('logins with credentials', () => {
  session = new Session(Config.WIFIUC_USER, Config.WIFIUC_PASS)
  return session.login().then(session => {
    if (!session) {
      throw {message: 'Could not create session'}
    }
  })
})

it('recognizes bad credentials', () => {
  session = new Session('fake_user', 'fake_pass')
  const error = {
    message: 'Did not recognize bad login'
  }
  const failed = () => {
    throw error
  }
  return session.login().then(failed).catch(err => {
    if (err == error) {
      failed()
    }
  })
})
