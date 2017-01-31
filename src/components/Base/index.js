import React, {Component} from 'react'
import {View} from 'react-native'

export default class Base extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Base'
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

  addState = (state) => this.state = Object.assign(this.state, state)

  logRender = (name = this.state.className) => {
    console.log(name)
    console.log(this.state)
    console.log(this.props)
  }
}
