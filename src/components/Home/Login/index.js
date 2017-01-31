import React from 'react'
import {View, ActivityIndicator, StyleSheet, Text, Button} from 'react-native'
import * as Keychain from 'react-native-keychain'
import FormHelper from 'tcomb-form-native'
import Base, {Styles} from '../../Base'

const navigationOptions = {
  title: 'Login'
}

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
  static navigationOptions = navigationOptions

  onChange = (user) => {
    this.setState({user})
  }

  onPress = () => {
    var user = this.refs.form.getValue()
    if (!user) {
      return this.setState({text: 'Faltan datos'})
    }
    if (this.state.loging) {
      return this.setState({text: 'Ya se está intentando ingresar, espera...'})
    }
    this.setState({
      loging: true,
      text: ''
    }, this.saveCredentials)
  }

  saveCredentials = () => {
    const {username, password} = {
      ...this.state.user
    }
    Keychain.setGenericPassword(username, password).then(() => {
      this.login(username, password)
    })
  }

  login = (username, password) => {
    this.props.loginSuccess(username, password) // TODO: EJALE
    // const session = new Session(username, password)
    // session.login().then((logged, text) => {
    //   this.setState({
    //     loging: false
    //   }, () => Actions.pop({
    //     refresh: {
    //       shouldReload: true
    //     }
    //   }))
    // }).catch(error => this.setState({loging: false, text: error}))
  }

  render() {
    return (
      <View style={Styles.container}>
        <Form ref='form' type={UCUser} options={formOptions} value={this.state.user} onChange={this.onChange}/>
        <View>
          {!this.state.loging && <Button title='Ingresar' onPress={this.onPress}/>}
          {this.state.loging && <ActivityIndicator/>}
        </View>
        <Text style={Styles.textCentered}>{this.state.text}</Text>
        {this.props.loginCancel && <Button title='Cancelar' onPress={this.props.loginCancel}/>}
      </View>
    )
  }
}
