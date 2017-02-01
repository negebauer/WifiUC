import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Base, {Debug} from '../../Base'

export default class Options extends Base {

  constructor(props) {
    super(props)
    const state = {}
    this.addState(state)
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text>Aquí van las opciones</Text>
        <Debug state={this.state} name='Options' hide/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 6
  }
})
