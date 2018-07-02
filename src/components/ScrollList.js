import React, { Component } from "react";
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View } from "react-native";


class ScrollList extends Component {
  state = {xOffset: 0, listItems: [0,1,2,3,4,5], currentItem: 0}
  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: true }
          )
        }
        onMomentumScrollEnd={event => {
          // setTimeout(()=>console.log('hi', event.nativeEvent.contentOffset.x), 200))
          console.log('current offset: ', this.state.xOffset)
          console.log('new offset: ', event.nativeEvent.contentOffset.x)
          if (Math.min(event.nativeEvent.contentOffset.x, (this.state.listItems.length-1)*300) > this.state.xOffset) {
            console.log('move right')
            this.setState({xOffset: Math.min(event.nativeEvent.contentOffset.x, (this.state.listItems.length-1)*300)})
          } else if (Math.max(event.nativeEvent.contentOffset.x,0) < this.state.xOffset) {
            console.log('move left')
            this.setState({xOffset: Math.max(event.nativeEvent.contentOffset.x,0)})
          } else {
            console.log('do nothing')
          }

        }}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        <Screen text="Screen 1" index={0} />
        <Screen text="Screen 2" index={1} />
        <Screen text="Screen 3" index={2} />
        <Screen text="Screen 4" index={3} />
        <Screen text="Screen 5" index={4} />
        <Screen text="Screen 6" index={5} />
      </Animated.ScrollView>
    );
  }
}


const SCREEN_WIDTH = Dimensions.get("window").width;

const xOffset = new Animated.Value(0);

const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};

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
  };
};


const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    marginTop: -250
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 400,
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 45,
    fontWeight: "bold"
  }
});

export default ScrollList
