import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
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

  logRender = () => {
    if (!Project.isDev) {
      return
    }
    // console.log(name)
    console.log(this.state)
    console.log(this.props)
  }
}
