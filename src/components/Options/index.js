import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Config from 'react-native-config'

const Options = ({ready}) => ready && (
  <View>
    <Text>Options</Text>
  </View>
)

Options.propTypes = {
  ready: React.PropTypes.bool.isRequired
}

const styles = StyleSheet.create({})

export default Options
