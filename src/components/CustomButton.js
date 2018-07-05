import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'


const CustomButton = props => {

  return (
  <View
    style={{
      // backgroundColor: 'rgba(55,130,135,.9)',
      zIndex: 99,
      borderRadius: 30,
      justifyContent: 'center',
      margin: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
    }}
  >
    <Text style={{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'


    }}
    onPress={()=>{
      props.action()
    }}
    >{props.text}</Text>
  </View>
)
}



export default CustomButton
