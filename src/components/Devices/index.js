import React, {Component} from 'react'
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import Config from 'react-native-config'

const Devices = ({devices, ready}) => ready && (
  <View>
    <Text>Devices</Text>
    {devices.map(device => (
      <View key={device.mac}>
        <Text key={device.mac}>{`Mac: ${device.mac} Name: ${device.name}`}</Text>
      </View>
    ))}
  </View>
)

Devices.propTypes = {
  devices: React.PropTypes.array.isRequired,
  ready: React.PropTypes.bool.isRequired
}

const styles = StyleSheet.create({})

export default Devices
