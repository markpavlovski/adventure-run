import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Platform, StyleSheet, Text, View, ListView, Animated, Dimensions, TouchableHighlight } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo'

import {getDistance} from '../helpers'

import TrackMarker from './TrackMarker'
import CheckpointMarker from './CheckpointMarker'
import ScrollList from './ScrollList'
import BackButton from './BackButton'
import StartButton from './StartButton'

class Map extends Component {

  render = () => {
    const tracks = this.props.trackData
    return (
    <View>
      <BackButton visible={this.state.showTrackDetail} resetView={this.resetView}/>
      <StartButton visible={this.state.showTrackDetail}/>
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
          {/*  RENDER TRACK MARKERS */}
            { this.state.showTrackMarkers ? tracks.map((track, idx) =>
              <TrackMarker
                key={idx}
                animateSlide={this.animateSlide}
                {...{track, setShowScrollList: this.setShowScrollList}}
              />
            ) : null }

          {/*  RENDER CHECKPOINTS */}

            { this.state.showTrackDetail ? tracks.find(track => track.id === this.state.trackId).checkPoints.map((checkPoint, idx, checkPoints) =>
              <CheckpointMarker
                key={idx}
                {...{checkPoint, idx, checkPoints}}
              />
            ) : null }

        </MapView>
        <ScrollList
          changeMapView={this.changeMapView}
          registerCallback={this.registerCallback}
          exploreTrack={this.exploreTrack}
        />
      </View>
    </View>
    )
  }

  constructor(props){
    super(props)
    const tracks = this.props.trackData
    this.DISTANCE_THRESHOLD = 10
    this.animateSlide = _ => _
    this.state = {
      location: null,
      region: {...tracks[0], latitude: tracks[0].latitude - 0.009},
      errorMessage: null,
      showScrollList: false,
      showTrackMarkers: true,
      showTrackDetail: false,
      trackId: null
    }
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

  componentDidMount(){
    setTimeout(() => this.fitToMarkers(this.props.trackData), 100)
  }


  fitToMarkers = (locations) => {
    this.mapView.fitToCoordinates(locations, {edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }})
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

  setShowScrollList = bool => {
    this.setState({showScrollList: bool})
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
      this.animateSlide(HALF,NONE)
      this.fitToMarkers(this.props.trackData)
    }
  }

  registerCallback = (animateSlide) => {
    this.animateSlide = animateSlide
  }

  exploreTrack = trackId => {
    const tracks = this.props.trackData
    const checkPoints = tracks.find(track => track.id === trackId).checkPoints
    this.fitToMarkers(checkPoints)
    this.triggerHideAnimation()
    this.setShowScrollList(false)
    this.setState({
      showTrackMarkers: false,
      showTrackDetail: true,
      trackId
    })
  }

  resetView = () => {
    this.changeMapView(this.state.trackId)
    this.setState({
      showTrackMarkers: true,
      showTrackDetail: false,
      showScrollList: false
    })
  }

}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HALF = 'HALF'
const NONE = 'NONE'
const FULL = 'FULL'



const mapStateToProps = ({activePage, activeScrollItem, trackData}) => ({activePage, activeScrollItem, trackData})
export default connect(mapStateToProps)(Map)
