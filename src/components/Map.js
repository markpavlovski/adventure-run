import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Platform, StyleSheet, Text, View, ListView, Animated, Dimensions, TouchableHighlight } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo'

import {getDistance} from '../helpers'

import TrackMarker from './TrackMarker'
import CheckpointMarker from './CheckpointMarker'
import ScrollList from './ScrollList'
import BackButton from './BackButton'

class Map extends Component {

  render = () => {
    const tracks = this.props.trackData
    return (
    <View>
      <BackButton visible={this.state.showTrackDetail}/>
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
                triggerShowAnimation={this.triggerShowAnimation}
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

        {/*  RENDER TRACK UI */}

        {/* <View style={{
          backgroundColor: 'white',
          width: 60,
          height: 60,
          marginTop: 40,
          marginLeft: 20,
          borderRadius: 30,
          shadowOffset:{  width: 5,  height: 5,  },
          shadowColor: 'black',
          shadowOpacity: 0.2,
          // padding: 10,
          justifyContent: 'center'
        }}>
            <Text style={{margin: 10, fontSize: 30, textAlign: 'left'}}>
               Back
            </Text>
        </View> */}



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
    this.triggerShowAnimation = _ => _
    this.triggerHideAnimation = _ => _
    this.state = {
      location: null,
      region: {...tracks[0], latitude: tracks[0].latitude - 0.009},
      errorMessage: null,
      showScrollList: false,
      showTrackMarkers: true,
      showTrackDetail: false,
      activeTrackId: null,
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
      this.triggerHideAnimation()
      this.fitToMarkers(this.props.trackData)
    }

  }

  registerCallback = (show,hide) => {
    this.triggerShowAnimation = show
    this.triggerHideAnimation = hide
  }

  exploreTrack = trackId => {
    const tracks = this.props.trackData
    console.log(trackId)
    const checkPoints = tracks.find(track => track.id === trackId).checkPoints
    console.log(checkPoints)
    this.fitToMarkers(checkPoints)
    this.triggerHideAnimation()
    this.setShowScrollList(false)
    this.setState({
      showTrackMarkers: false,
      showTrackDetail: true,
      trackId
    })
    setTimeout(()=>console.log(this.state.trackId),300)
  }

}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;



const mapStateToProps = ({activePage, activeScrollItem, trackData}) => ({activePage, activeScrollItem, trackData})
export default connect(mapStateToProps)(Map)
