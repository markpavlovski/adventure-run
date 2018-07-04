import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'


const TrackUI = props => {
  const SCREEN_HEIGHT = Dimensions.get("window").height
  const CONTAINER_HEIGHT = 60
  const MARGIN_TOP = SCREEN_HEIGHT - CONTAINER_HEIGHT - 80
  return props.visible ?  (
  <View style={{
    backgroundColor: 'rgba(0,0,0,.9)',
    height: CONTAINER_HEIGHT,
    margin: 30,
    marginTop: MARGIN_TOP,
    marginBottom: - CONTAINER_HEIGHT - MARGIN_TOP,
    zIndex: 99,
    borderRadius: 30,
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.4,
    justifyContent: 'center',
  }}
  >
    <Text style={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'


    }} >Start</Text>
  </View>
)
:  null
}



export default TrackUI
