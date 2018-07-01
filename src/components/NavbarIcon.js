import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

const NavbarIcon = props => (
  props.label === 'Start'
  ? <View style={styles.containerStart}>
      <Icon color='#999' {...props}  size={30}/>
      <Text style={styles.label} >{props.label}</Text>
    </View>
  : <View style={styles.container}>
      <Icon color='#999' {...props} />
      <Text style={styles.label} >{props.label}</Text>
    </View>
)

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    textAlign: 'center'
  },
  container: {
    padding: 8
  },
  containerStart: {
    padding: 3
  }
})

export default NavbarIcon
