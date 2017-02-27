import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Session from '../../containers/Session'
import Devices from '../../containers/Devices'
import Options from '../../containers/Options'
import StatusBar from '../../containers/StatusBar'
import Colors from '../../utils/colors'
import Project from '../../utils/project'

const App = () => (
  <View style={styles.app}>
    <StatusBar></StatusBar>
    {Project.ios && <View style={styles.statusBar}/>}
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
    flex: 1,
    backgroundColor: Colors.main
  },
  statusBar: {
    backgroundColor: Colors.main,
    height: 24
  },
  options: {
    backgroundColor: 'red'
  },
  devices: {
    backgroundColor: 'blue'
  }
})

export default App
