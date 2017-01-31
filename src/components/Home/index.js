import React from 'react'
import {View, Text, Button, ScrollView, ActivityIndicator} from 'react-native'
import Base, {Styles} from '../Base'
import Login from './Login'
import Session from '../../utils/session'

const navigationOptions = {
  title: 'Wifi UC',
  header: ({state, setParams}) => ({left: (<Button title='logout' onPress={() => setParams({login: true})}/>)})
}

export default class Home extends Base {
  static navigationOptions = navigationOptions

  constructor(props) {
    super(props)
    const state = {
      login: false,
      username: '',
      password: '',
      ready: false
    }
    this.addState(state)
  }

  componentDidMount() {
    goLogin = () => {
      if (this.state.login) {
        this.navigate('Login')
      }
    }
    Session.exists((username, password, login) => this.setState({username, password, login, ready: true}), goLogin)
  }

  loginSuccess = (username, password) => this.setState({username, password, login: false})
  loginCancel = () => this.setState({login: false})

  render() {
    if (!this.state.ready) {
      return <ActivityIndicator style={Styles.containerCentered}/>
    }
    if (this.state.login) {
      return <ScrollView><Login loginSuccess={this.logged} loginCancel={this.state.username && this.loginCancel}/></ScrollView>
    }
    return (
      <ScrollView style={Styles.container}>
        <Text>Hello, Chat App!</Text>
        <Button title='Login' onPress={() => this.setState({login: true})}/>
        <View>
          {Object.keys(this.state).map(k => <Text key={k}>{`${k}: ${this.state[k]}`}</Text>)}
        </View>
      </ScrollView>
    )
  }
}
