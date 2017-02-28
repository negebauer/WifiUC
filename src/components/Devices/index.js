import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Option = props => (
  <Icon size={16} style={styles.option} {...props}>{props.children}</Icon>
)

Option.propTypes = {
  children: React.PropTypes.any
}

const Devices = ({devices, devicesInteract, toggleEdit, editMode, logout}) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>Dispositivos</Text>
      {!editMode && <View style={styles.options}>
        <Option name='refresh' onPress={() => {}}/>
        <Option name='plus' onPress={() => {}}/>
        <Option name='edit' onPress={toggleEdit}/>
        <Option name='sign-out' onPress={logout}/>
      </View>}
      {editMode && <View style={styles.options}>
        <Option name='check' onPress={toggleEdit}/>
      </View>}
    </View>
    <ScrollView style={styles.devices}>
      {devices.map(device => (
        <View key={device.mac}>
          <Text key={device.mac}>{`Mac: ${device.mac} Name: ${device.name}`}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)

Devices.propTypes = {
  devices: React.PropTypes.array.isRequired,
  devicesInteract: React.PropTypes.bool.isRequired,
  toggleEdit: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  option: {
    padding: 12,
    color: 'gray'
  },
  devices: {
    flex: 1
  }
})

export default Devices
