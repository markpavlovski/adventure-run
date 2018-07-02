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
    this.DISTANCE_THRESHOLD = 10
    this.state = {
      location: null,
      region: {
        latitude: 47.681471,
        longitude: -122.328945,
        latitudeDelta: 0.06222,
        longitudeDelta: 0.08221,
      },
      errorMessage: null,
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
    this.mapView.animateToRegion(tracks[trackIndex], 300)
  }

  render = () => (
    <View>
      {console.log(this.state.region)}
      <MapView
        provider='google'
        style={{height: SCREEN_HEIGHT-50, justifyContent: 'flex-end'}}
        showsUserLocation
        // showsMyLocationButton
        initialRegion={this.state.region}
        ref={ref => { this.mapView = ref }}
        onRegionChange	= {region => this.setState({region})}>
          {tracks.map((track, idx) =>  <TrackMarker key={idx} {...{track}}/>)}



      </MapView>
      <ScrollList changeMapView={this.changeMapView}/>
    </View>
  )
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


const LATITUDE_DELTA =  0.06222
const LONGITUDE_DELTA =  0.08221

const tracks = [
  {
    name: 'Green Lake Loop',
    latitude: 47.681471,
    longitude: -122.328945,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5
  },
  {
    name: 'Ballard - Downtown Thru',
    latitude: 47.667729,
    longitude: -122.384861,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 12
  },
  {
    name: 'All The Parks Thru',
    latitude: 47.617981,
    longitude: -122.319498,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 10
  },
  {
    name: 'Troll Thru',
    latitude: 47.651410,
    longitude: -122.351054,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 6
  },
  {
    name: 'Montlake Brige Loop',
    latitude: 47.647282,
    longitude: -122.304621,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5
  },
  {
    name: 'Eastlake Stairs Loop',
    latitude: 47.634961,
    longitude: -122.322331,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5
  },
]
const greenLakeTrack = [
  '47.68149, -122.32894',
  '47.68215, -122.33998',
  '47.67553, -122.34627',
  '47.67163, -122.34238',
  '47.67574, -122.33385',
  '47.68003, -122.32940'
]
const allTheParks = [
  '-122.3194980, 47.6179810',
  '-122.3190093, 47.6253467',
  '-122.3145890, 47.6287560',
  '-122.3157263, 47.6318587',
  '-122.3101205, 47.6323639',
  '-122.3073538, 47.6323856',
  '-122.3054963, 47.6351799',
  '-122.3059040, 47.6365029',
  '-122.3048258, 47.6375512',
  '-122.3044449, 47.6379235',
  '-122.3021275, 47.6395265',
  '-122.2968744, 47.6395130',
  '-122.2947004, 47.6397976',
  '-122.2921121, 47.6420331',
  '-122.2903512, 47.6468337',
  '-122.3009956, 47.6468544',
  '-122.3044315, 47.6470622',
  '-122.3039326, 47.6495161',
]



const mapStateToProps = ({activePage, activeScrollItem}) => ({activePage, activeScrollItem})
export default connect(mapStateToProps)(Map)
