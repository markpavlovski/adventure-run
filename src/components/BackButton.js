import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'


const BackButton = props => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  return props.visible ?  (
  <View style={{
    backgroundColor: 'rgba(55,130,135,.9)',
    width: 60,
    height: 60,
    marginTop: 30,
    marginBottom: -90,
    zIndex: 99,
    marginLeft: 20,
    borderRadius: 30,
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: 'black',
    // shadowOpacity: 0.4,
    justifyContent: 'center'
  }}
  >
    <Icon
      name='arrow-left'
      type='font-awesome'
      color='white'
      size={20}
      fontWeight={'light'}
      onPress={props.resetView}
      underlayColor={'rgba(0,0,0,0)'}
      containerStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
    />
  </View>
)
:  null
}



export default BackButton
