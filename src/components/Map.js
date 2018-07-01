import React, {Component} from "react"
import {connect} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { MapView, Constants, Location, Permissions  } from 'expo'

import {getDistance} from '../helpers'

class Map extends Component {

  constructor(props){
    super(props)
    this.DISTANCE_THRESHOLD = 10
    this.state = {
      location: null,
      region: {
        latitude: 47.599815,
        longitude:  -122.331373,
        latitudeDelta: 0.006222,
        longitudeDelta: 0.008221
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


  render = () => (
    <MapView
      provider='google'
      style={{flex: 1}}
      showsUserLocation
      // showsMyLocationButton
      initialRegion={this.state.region}
      ref={ref => { this.mapView = ref }}
      onRegionChange	= {region => this.setState({region})}>
      {
        tracks.map((track, idx) =>
          <MapView.Marker
            key={idx}
            coordinate={track}
            title={`${track.name}`}
            description={`${track.length.toFixed(1)} km / ${(track.length * 0.621371).toFixed(1)} mi`}/>
        )
      }
    </MapView>
  )
}


const tracks = [
  {
    name: 'Green Lake Loop',
    latitude: 47.681471,
    longitude: -122.328945,
    length: 5
  },
  {
    name: 'Ballard - Downtown Thru',
    latitude: 47.667729,
    longitude: -122.384861,
    length: 12
  },
  {
    name: 'All The Parks Thru',
    latitude: 47.617981,
    longitude: -122.319498,
    length: 10
  },
  {
    name: 'Troll Thru',
    latitude: 47.651410,
    longitude: -122.351054,
    length: 6
  },
  {
    name: 'Montlake Brige Loop',
    latitude: 47.647282,
    longitude: -122.304621,
    length: 5
  },
  {
    name: 'Eastlake Stairs Loop',
    latitude: 47.634961,
    longitude: -122.322331,
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


const mapStateToProps = ({activePage}) => ({activePage})
export default connect(mapStateToProps)(Map)
