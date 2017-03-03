import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import Session from '../../containers/Session'
import Devices from '../../containers/Devices'
import Options from '../../containers/Options'
import StatusBar from '../../containers/StatusBar'
import Watch from '../../containers/Watch'
import Colors from '../../utils/colors'
import Project from '../../utils/project'

const App = () => (
  <View style={styles.app}>
    {Project.ios && <View style={styles.statusBar} />}
    <StatusBar />
    <View style={styles.box}>
      <Session>
        <Devices />
      </Session>
    </View>
    {Project.ios && <Watch />}
  </View>
)

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  box: {
    flex: 1,
    margin: 20,
    marginBottom: 26,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  statusBar: {
    backgroundColor: Colors.main,
    height: 24,
  },
})

export default App
