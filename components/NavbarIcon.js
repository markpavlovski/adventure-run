import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { Icon } from 'react-native-elements'

const NavbarIcon = props => (
  <View style={{padding: 8}}>
    <Icon color='#999' {...props} />
    <Text style={[styles.label, props.label === 'Start' ? styles.startLabel : {}]} >{props.label}</Text>
  </View>
)

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    textAlign: 'center'
  },
  startLabel: {
    color: '#378287'
  }
})

export default NavbarIcon
