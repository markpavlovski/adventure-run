import React, { Component } from 'react'
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View, Easing } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Screen from './Screen'

import { changeActiveScrollItem} from '../actions'

class ScrollList extends Component {

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
            [{ nativeEvent: { contentOffset: { x: this.xOffset } } }],
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
          beginActivity={this.props.beginActivity}
          animateSlide={this.animateSlide}
          setDisplay = {this.setDisplay}
          displaySize = {this.state.displaySize}
          xOffset = {this.xOffset}
          distanceToMarker = {this.props.distanceToMarker}
        />)}
      </Animated.ScrollView>
    </Animated.View>

    );
  }

  constructor (props) {
    super(props)
    this.animatedValue = new Animated.Value(0)
    this.state = {
      displaySize: HALF
    }
    this.xOffset = new Animated.Value(0);

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
    this.setDisplay(stop)
  }


  scrollToIndex = index => {
    this.scrollView.getNode().scrollTo({
      x: SCREEN_WIDTH * index,
      animated: false
    })
  }

}

const SCREEN_WIDTH = Dimensions.get("window").width
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
  }
})


const mapStateToProps = ({activeScrollItem, trackData}) => ({activeScrollItem, trackData})
const mapDispatchToProps = dispatch => bindActionCreators({changeActiveScrollItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ScrollList)
