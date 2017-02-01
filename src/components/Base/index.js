import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Project from '../../utils/project'
import styles from './styles'

export {styles as Styles}

export default class Base extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // name: 'Base'
    }
  }

  get navigate() {
    const {navigate} = this.props.navigation
    return navigate
  }

  get params() {
    const {params} = this.props.navigation.state
    return params
  }

  get dispatch() {
    const {dispatch} = this.props.navigation
    return dispatch
  }

  params = (props = this.props) => props.navigation.state

  addState = (state) => this.state = Object.assign(this.state, state)

  logRender = (name = 'Base') => {
    if (!Project.isDev) {
      return
    }
    console.log(name)
    console.log(this.state)
    console.log(this.props)
  }

}

export class Debug extends Base {

  static styles = StyleSheet.create({
    debug: {
      margin: 20,
      padding: 20,
      flexDirection: 'column',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'chocolate'
    },
    text: {
      color: 'white'
    }
  })

  static container = Debug.styles.debug
  static text = Debug.styles.text

  debugRender = (state) => Object.keys(state).map(k => this.debugRenderValue(k, state))

  debugRenderValue = (key, object) => {
    const value = object[key]
    if (typeof value === 'function') {
      return null
    }
    if (value && typeof value === 'object') {
      return Object.keys(value).map(k => this.debugRenderValue(k, value))
    }
    return <Text style={Debug.text} key={key}>{`${key}: ${value}`}</Text>
  }

  render = () => !this.props.hide && Project.isDev && <View style={Debug.container}>
    <Text>{this.props.name}</Text>{this.debugRender(this.props.state)}</View>
}
