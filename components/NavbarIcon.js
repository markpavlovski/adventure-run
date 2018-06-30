import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { Icon } from 'react-native-elements'

const NavbarIcon = props => (
  <View style={{padding: 10}}>
    <Icon color='#777' {...props} />
    <Text>{props.label}</Text>
  </View>
)

export default NavbarIcon
