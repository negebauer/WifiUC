import React from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'
import FormHelper from 'tcomb-form-native'
import Button from 'apsl-react-native-button'
import Colors from '../../utils/colors'

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
    }
  }
}

const Login = ({user, login, userUpdate}) => (
  <View style={styles.container}>
    <Form type={UCUser} options={formOptions} value={user} onChange={userUpdate}/>
    <Button style={styles.button} onPress={() => login(user)}>Ingresar</Button>
    <Text style={styles.message}>{user.error}</Text>
  </View>
)

Login.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  userUpdate: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    borderColor: Colors.main
  },
  message: {
    marginTop: 12,
    textAlign: 'center'
  }
})

export default Login
