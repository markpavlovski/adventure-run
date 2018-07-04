import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'


const StartButton = props => {
  const SCREEN_HEIGHT = Dimensions.get("window").height
  const CONTAINER_HEIGHT = 50
  const MARGIN_TOP = SCREEN_HEIGHT - CONTAINER_HEIGHT - 80
  return props.visible ?  (
  <View style={{
    backgroundColor: 'rgba(55,130,135,.9)',
    height: CONTAINER_HEIGHT,
    margin: 20,
    marginTop: MARGIN_TOP,
    marginBottom: - CONTAINER_HEIGHT - MARGIN_TOP,
    zIndex: 99,
    borderRadius: 30,
    justifyContent: 'center',
  }}
  >
    <Text style={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'


    }} >{ true ? 'Too Far to Start' : 'Start'}</Text>
  </View>
)
:  null
}



export default StartButton
