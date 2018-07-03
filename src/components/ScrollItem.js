import React, { Component } from 'react'
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View, Easing } from 'react-native'


class ScrollItem extends Component {
  render(){
    const props = this.props
    return (
      <View style={styles.scrollPage}>
        <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
          <Text style={styles.text}>{props.text}</Text>
        </Animated.View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  screen: {
    height: 400,
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 30,
    fontWeight: "bold"
  }
});


const transitionAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: [0.25, 1, 0.25]
        })
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["45deg", "0deg", "45deg"]
        })
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
          ],
          outputRange: ["-45deg", "0deg", "45deg"]
        })
      }
    ]
  }
}

export default ScrollItem
