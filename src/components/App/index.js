import React, {Component} from 'react'
import {View, StyleSheet, StatusBar} from 'react-native'
import Session from '../../containers/Session'
import Devices from '../../containers/Devices'
import Options from '../../containers/Options'

// <StatusBar backgroundColor="blue" barStyle="default" networkActivityIndicatorVisible={false}/>
const App = () => (
  <View style={styles.app}>
    <Session>
      <View style={styles.options}>
        <Options style={styles.options}/>
      </View>
      <View style={styles.devices}>
        <Devices/>
      </View>
    </Session>
  </View>
)

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  options: {
    backgroundColor: 'red'
  },
  devices: {
    backgroundColor: 'blue'
  }
})

export default App
