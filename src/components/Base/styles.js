import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  containerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCentered: {
    textAlign: 'center'
  }
})

export default styles
