import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Platform, StyleSheet, Text, View, ListView, Animated, Dimensions } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo'

import {getDistance} from '../helpers'

import TrackMarker from './TrackMarker'
import ScrollList from './ScrollList'

class Map extends Component {

  constructor(props){
    super(props)
    const tracks = this.props.trackData
    this.DISTANCE_THRESHOLD = 10
    this.triggerShowAnimation = _ => _
    this.triggerHideAnimation = _ => _
    this.state = {
      location: null,
      region: {...tracks[0], latitude: tracks[0].latitude - 0.009},
      errorMessage: null,
      showScrollList: false
    }
  }

  setShowScrollList = bool => {
    this.setState({showScrollList: bool})
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this.getLocationAsync()
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    this.setState({ location })
  }

  changeMapView = (trackIndex) => {
    const tracks = this.props.trackData
    const focusLocation = tracks[trackIndex]
    const latitude = focusLocation.latitude - 0.009
    this.mapView.animateToRegion({...focusLocation, latitude }, 500)
  }

  handleMapPress = () => {
    if (this.state.showScrollList) {
      this.setShowScrollList(false)
      this.triggerHideAnimation()
    }

  }

  registerCallback = (show,hide) => {
    this.triggerShowAnimation = show
    this.triggerHideAnimation = hide
  }

  render = () => {
  const tracks = this.props.trackData
  return (
    <View>
      <MapView
        provider='google'
        style={{height: SCREEN_HEIGHT-50}}
        showsUserLocation
        // showsMyLocationButton
        initialRegion={this.state.region}
        ref={ref => { this.mapView = ref }}
        onRegionChange	= {region => this.setState({region})}
        onPress = {()=>this.handleMapPress()}
      >
          {tracks.map((track, idx) =>
            <TrackMarker
              key={idx}
              triggerShowAnimation={this.triggerShowAnimation}
              {...{track, setShowScrollList: this.setShowScrollList}}/>)}
      </MapView>
      <ScrollList changeMapView={this.changeMapView} registerCallback={this.registerCallback}/>
    </View>
  )}
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;



const mapStateToProps = ({activePage, activeScrollItem, trackData}) => ({activePage, activeScrollItem, trackData})
export default connect(mapStateToProps)(Map)
