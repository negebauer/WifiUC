import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Session from '../../containers/Session'
import Devices from '../../containers/Devices'
import Options from '../../containers/Options'

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
