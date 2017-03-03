import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Login from '../Login'
import Loading from './Loading'

class Watch extends Component {
  componentWillReceiveProps(nextProps) {}

  render = () => null
}

Watch.propTypes = {
  user: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  userUpdate: React.PropTypes.func.isRequired,
  children: React.PropTypes.any.isRequired,
  devicesRefresh: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({})

export default Watch
