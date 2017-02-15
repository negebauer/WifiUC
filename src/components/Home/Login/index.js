import React from 'react'
import {View, ActivityIndicator, Text, Button} from 'react-native'
import FormHelper from 'tcomb-form-native'
import {USER, PASS} from 'react-native-dotenv'
import Base, {Styles, Debug} from '../../Base'
import Session from '../session'

const Form = FormHelper.form.Form
UCUserStruct = {
  username: FormHelper.String,
  password: FormHelper.String
}
const UCUser = FormHelper.struct(UCUserStruct)
const formOptions = {
  fields: {
    username: {
      label: 'Usuario UC',
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      label: 'Contraseña',
      secureTextEntry: true
    },
    keepData: {
      label: 'Login automatico'
    }
  }
}

export default class Login extends Base {

  constructor(props) {
    super(props)
    const state = {
      text: this.props.text || '',
      loging: false,
      shouldReload: false,
      user: {
        username: USER,
        password: PASS
      }
    }
    this.addState(state)
    Session.logout()
  }

  onChange = (user) => {
    this.setState({user})
  }

  loginCheck = () => {
    let user = this.refs.form.getValue()
    if (!user) {
      return this.setState({text: 'Faltan datos'})
    }
    if (this.state.loging) {
      return this.setState({text: 'Ya se está intentando ingresar, espera...'})
    }
    this.setState({
      loging: true,
      text: ''
    }, this.login)
  }

  login = () => {
    const {username, password} = {
      ...this.state.user
    }
    Session.save(username, password).then(() => {
      const session = new Session(username, password)
      session.login().then(() => {
        this.setState({
          loging: false
        }, () => this.props.loginSuccess(session))
      }).catch(error => this.setState({loging: false, text: error.message}))
    })
  }

  render() {
    this.logRender('Login')
    return (
      <View>
        <Form ref='form' type={UCUser} options={formOptions} value={this.state.user} onChange={this.onChange}/>
        <View>
          {!this.state.loging && <Button title='Ingresar' onPress={this.loginCheck}/>}
          {this.state.loging && <ActivityIndicator/>}
        </View>
        <Text style={Styles.textCentered}>{this.state.text}</Text>
        <Debug state={this.state}/>
      </View>
    )
  }
}
