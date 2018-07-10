import React, { Component } from 'react'
import { Animated,Dimensions,ScrollView,StyleSheet,Text, View, Easing } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-native-elements'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'


import { changeActiveScrollItem} from '../actions'


class Screen extends Component {

  render = () => {
    const props = this.props
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
      START_THRESHOLD: 30
    }
    const distance = this.props.distanceToMarker

    return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, this.transitionAnimation(props.index)]}>
        <View style={styles.contentContainer}>
          <GestureRecognizer
            onSwipeUp={(state) => this.onSwipeUp(state)}
            onSwipeDown={(state) => this.onSwipeDown(state)}
            config={config}
            style={styles.gestureContainer}
          >
            <Text style={styles.titleText} onPress={this.handleAnimateSlide}>{props.text}</Text>
          {distance < config.START_THRESHOLD
            ? <Button
                style={{width: 180}}
                title="START THE RUN"
                loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                fontSize={16}
                color='#378287'
                buttonStyle={styles.button}
                onPress={()=>props.beginActivity(props.index)}
              />
          : <Button
              style={{width: 180}}
              title="GET CLOSER TO TRACK"
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              fontSize={16}
              color='#378287'
              buttonStyle={styles.button}
            />
        }
        <View style={styles.leaderboardHeaderContainer}>
          <Text style={styles.leaderboardHeader}>Weekly Leaderboard</Text>
        </View>
          {/* <Text style={styles.warningText}>You are {distance} meters away from the closest marker on this track. You must be within {config.START_THRESHOLD} meters of the track to get started.</Text> */}
        <View style={styles.leaderboardTable}>
          <View>
            <Text style={styles.runnerName}>1. {'Dandog'}</Text>
            <Text style={styles.runnerName}>2. {'Mark Pavlovski'}</Text>
            <Text style={styles.runnerName}>3. {'Tengo'}</Text>
          </View>
          <View>
            <Text style={styles.runTime}>00:20:36</Text>
            <Text style={styles.runTime}>00:30:13</Text>
            <Text style={styles.runTime}>00:31:56</Text>

          </View>
        </View>
        <Text style={styles.guild}>Track held by {
          <Text style={{fontWeight: 'bold'}}>Lovelace Lemuirs</Text>
        }</Text>


        </GestureRecognizer>
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
    if (this.props.displaySize === HALF) this.props.animateSlide(HALF,FULL)
    if (this.props.displaySize === FULL) this.props.animateSlide(FULL,HALF)
  }

  onSwipeUp(gestureState) {
    if (this.props.displaySize === HALF) this.props.animateSlide(HALF,FULL)
    console.log('up')
  }

  onSwipeDown(gestureState) {
    if (this.props.displaySize === FULL) this.props.animateSlide(FULL,HALF)
    console.log('down')
  }

  transitionAnimation = index => {
    const xOffset = this.props.xOffset
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

}



const SCREEN_WIDTH = Dimensions.get("window").width;
const MARGIN_TOP = 400
const SMALL_CONTENT_HEIGHT = 150
const HALF_THRESHOLD = SMALL_CONTENT_HEIGHT/MARGIN_TOP
const NONE = 'NONE'
const HALF = 'HALF'
const FULL = 'FULL'


const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 400,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "white"
  },
  gestureContainer: {
    justifyContent: 'center',
    // height: SMALL_CONTENT_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'flex-start',
    // height: 400,
    alignItems: 'center'
  },
  titleText: {
    height: SMALL_CONTENT_HEIGHT,
    width: SCREEN_WIDTH-40,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
    alignSelf: 'center',
  },
  warningText: {
    fontSize: 12,
    // marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0)",
    padding: 10,
    borderColor: '#378287',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: -20
  },
  leaderboardHeaderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#378287',
    marginTop: 30,
    marginBottom: 15
  },
  leaderboardHeader: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    width: SCREEN_WIDTH-80,
    color: '#378287',
    paddingTop: 5,
    paddingBottom: 5,
  },
  leaderboardTable: {
    // flex: 1,
    width: SCREEN_WIDTH-80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  runnerName: {
    fontSize: 14
  },
  runTime: {
    fontSize: 14
  },
  guild: {
    textAlign: 'left',
    width: SCREEN_WIDTH-80,
    marginTop: 20,
    color: '#378287',
  }
});


const mapStateToProps = ({activeScrollItem, trackData, closestCheckpointDistance}) => ({activeScrollItem, trackData, closestCheckpointDistance})
const mapDispatchToProps = dispatch => bindActionCreators({changeActiveScrollItem}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Screen)
