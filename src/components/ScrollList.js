import React, { Component } from 'react'
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeActiveScrollItem} from '../actions'

class ScrollList extends Component {
  
  render() {
    console.log(this.props)
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
          const newItem = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH)
          this.props.changeActiveScrollItem(newItem)
          this.props.changeMapView(newItem)
        }}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        <Screen text={this.props.activeScrollItem} index={0} />
        <Screen text={this.props.activeScrollItem} index={1} />
        <Screen text={this.props.activeScrollItem} index={2} />
        <Screen text={this.props.activeScrollItem} index={3} />
        <Screen text={this.props.activeScrollItem} index={4} />
        <Screen text={this.props.activeScrollItem} index={5} />
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

const mapStateToProps = ({activeScrollItem}) => ({activeScrollItem})
const mapDispatchToProps = dispatch => bindActionCreators({changeActiveScrollItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ScrollList)
