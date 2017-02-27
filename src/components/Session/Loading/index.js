import React, {Component} from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'

const Loading = () => (
  <View style={styles.loading}>
    <Text style={styles.loadingText}>Cargando</Text><ActivityIndicator size='large'/></View>
)

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  loadingText: {
    textAlign: 'center',
    margin: 12,
    fontSize: 24
  }
})

export default Loading
