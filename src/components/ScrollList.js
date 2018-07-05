import React, { Component } from 'react'
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View, Easing } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-native-elements'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'


import { changeActiveScrollItem} from '../actions'

class ScrollList extends Component {

  constructor (props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      displaySize: HALF
    }
  }

  componentDidMount () {
    this.props.registerCallback(this.animateSlide)
  }

  setDisplay = displaySize => {
    this.setState({displaySize})
  }

  animateSlide = (start,stop, index = null) => {
    const config = {
      NONE: 0,
      HALF: HALF_THRESHOLD,
      FULL: 1
    }
    this.animatedValue.setValue(config[start])
    if (index !== null){
      this.scrollToIndex(index)
      this.props.changeMapView(index)
    }
    Animated.timing(
      this.animatedValue,
      {
        toValue: config[stop],
        duration: 300,
        easing: Easing.linear
      }
    )
    .start()
    return config[stop]
  }


  scrollToIndex = index => {
    this.scrollView.getNode().scrollTo({
      x: SCREEN_WIDTH * index,
      animated: false
    });
  }

  render() {
    const marginTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [MARGIN_TOP, 0]
    })
    return (
      <Animated.View style={{marginTop}}>
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
        ref={ref=>(this.scrollView=ref)}
      >
        {this.props.trackData.map((track, index) => <Screen
          text={track.name}
          index={index}
          key = {index}
          exploreTrack={this.props.exploreTrack}
          animateSlide={this.animateSlide}
          setDisplay = {this.setDisplay}
          displaySize = {this.state.displaySize}
        />)}
      </Animated.ScrollView>
    </Animated.View>

    );
  }
}


const SCREEN_WIDTH = Dimensions.get("window").width;

const xOffset = new Animated.Value(0);

class Screen extends Component {



  render = () => {
    const props = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        <View style={{
          justifyContent: 'space-around',
          height: 200,
          alignItems: 'center'
        }}>
            <GestureRecognizer
              // onSwipe={(direction, state) => this.onSwipe(direction, state)}
              onSwipeUp={(state) => this.onSwipeUp(state)}
              onSwipeDown={(state) => this.onSwipeDown(state)}
              // onSwipeLeft={(state) => this.onSwipeLeft(state)}
              // onSwipeRight={(state) => this.onSwipeRight(state)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: this.state.backgroundColor
              }}
            >
            {/* <Text>{this.state.myText}</Text>
            <Text>onSwipe callback received gesture: {this.state.gestureName}</Text> */}
            <Text style={styles.text} onPress={this.handleAnimateSlide}>{props.text}</Text>

          </GestureRecognizer>
          {/* <Button
            title="EXPLORE TRACK"
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            // titleStyle={{ fontWeight: "700", fontSize: 70 }}
            fontSize={16}
            color='#378287'
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 0)",
              padding: 10,
              borderColor: '#378287',
              borderWidth: 2,
              borderRadius: 5
            }}
            onPress={()=>props.exploreTrack(props.index)}
          /> */}
        </View>
      </Animated.View>
    </View>
  )}

  constructor(props) {
    super(props)
    this.state = {
      gestureName: 'none',
    }
  }

  handleAnimateSlide = () => {
    console.log(this.props.displaySize)
  }

  onSwipeUp(gestureState) {
    // this.setState({myText: 'You swiped up!'});
    this.props.animateSlide(HALF,FULL)
    this.props.setDisplay(FULL)
    // this.setState({currentDisplay: FULL})
    console.log('up')
  }

  onSwipeDown(gestureState) {
    // this.setState({myText: 'You swiped down!'});
    this.props.animateSlide(FULL,HALF)
    this.props.setDisplay(HALF)
    console.log('down')
  }

  // onSwipeLeft(gestureState) {
  //   this.setState({myText: 'You swiped left!'});
  // }
  //
  // onSwipeRight(gestureState) {
  //   this.setState({myText: 'You swiped right!'});
  // }
  //
  // onSwipe(gestureName, gestureState) {
  //   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   switch (gestureName) {
  //     case SWIPE_UP:
  //       break;
  //     case SWIPE_DOWN:
  //       break;
  //     case SWIPE_LEFT:
  //       break;
  //     case SWIPE_RIGHT:
  //       break;
  //   }
  // }

}


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


const MARGIN_TOP = 400
const SMALL_CONTENT_HEIGHT = 150
const HALF_THRESHOLD = SMALL_CONTENT_HEIGHT/MARGIN_TOP
const NONE = 'NONE'
const HALF = 'HALF'
const FULL = 'FULL'


const styles = StyleSheet.create({
  scrollView: {
    flexDirection: "row",
    marginTop: -MARGIN_TOP
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 400,
    // padding: 30,
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


const mapStateToProps = ({activeScrollItem, trackData}) => ({activeScrollItem, trackData})
const mapDispatchToProps = dispatch => bindActionCreators({changeActiveScrollItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ScrollList)
