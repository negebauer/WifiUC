import React from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import Storage from 'react-native-storage'
import Base, {Styles, Debug} from '../Base'
import Login from './Login'
import Devices from '../Devices'
import Session, {err as SessionError} from '../../utils/session'

import * as Keychain from 'react-native-keychain'

const navigationOptions = {
  title: 'Wifi UC'
}

export default class Home extends Base {
  static navigationOptions = navigationOptions

  constructor(props) {
    super(props)
    const state = {
      login: false,
      session: null,
      ready: false
    }
    this.addState(state)
  }

  componentWillMount() {
    const config = {
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true
    }
    const storage = new Storage(config)
    global.storage = storage
  }

  componentDidMount() {
    Session.load().then(this.login)
  }

  login = (session) => {
    if (!session) {
      return this.setState({ready: true, login: true})
    }
    session.login().then(() => this.setState({ready: true, session})).catch(error => {
      switch (error.id) {
        case SessionError.network:
          this.setState({error: 'No hay conexión a internet', ready: true, session})
        case SessionError.credentials:
          this.setState({login: true, loginText: 'Credenciales incorrectas\nIngresa tus credenciales nuevamente', ready: true, session})
        default:
          break
      }
    })
  }

  loginSuccess = (session) => this.setState({
    session,
    login: false,
    loginText: null
  }, () => this.logRender('Home'))

  render() {
    this.logRender('Home')
    if (!this.state.ready) {
      return <ActivityIndicator style={Styles.containerCentered}/>
    }
    if (this.state.login) {
      return <ScrollView><Login loginSuccess={this.loginSuccess} text={this.state.loginText}/></ScrollView>
    }
    return (
      <ScrollView style={Styles.container}>
        <Text>Hello, Chat App!</Text>
        <Button title='Login' onPress={() => this.setState({login: true})}/>
        <Devices session={this.state.session}/>
        <Debug state={this.state}/>
      </ScrollView>
    )
  }
}
