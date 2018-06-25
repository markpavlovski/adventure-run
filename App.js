import React, {Component} from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MapView, Constants, Location, Permissions  } from "expo";
import { Icon } from 'react-native-elements'

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    number: 0,
    coordinates: [],
    checkpoints: [
      {
        name: '1 - Occidental Square',
        latitude: 47.600434,
        longitude: -122.333188,
        visited: true
      },
      {
        name: '2 - Waterfall Garden Park',
        latitude: 47.600111,
        longitude: -122.331692,
        visited: false
      },
      {
        name: '3 - Zeitgeist',
        latitude: 47.599129,
        longitude: -122.331928,
        visited: false
      },
    ]
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      setInterval(this._getLocationAsync,1000)
    }
    setInterval(()=>this.setState({number: Math.random()}), 1000)
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})


    this.setState({ location, coordinates: [...this.state.coordinates,location.coords] })
    // console.log(location);
  };


  render() {
    return (
      <View style={{flex:1}}>
      <MapView
        provider='google'
        style={{
          flex: 1
        }}
        showsUserLocation={true}
        initialRegion={{
          latitude: 47.620242,
          longitude: -122.349848,
          latitudeDelta: 0.09222,
          longitudeDelta: 0.1221
        }}
      >

        <MapView.Marker
          coordinate={{
            latitude: 47.667289,
            longitude: -122.383815
          }}
          title={`${this.state.number}`}
          description={'metadata'}
        />
        {
          this.state.coordinates.length > 1
          ? <MapView.Polyline
          		coordinates={this.state.coordinates}
          		strokeColor="#000"
          		strokeWidth={6}
        	  />
          : null
        }
        {
          this.state.location
          ? <MapView.Marker
              coordinate={this.state.location.coords}
              title={`${this.state.location ? [this.state.location.coords.latitude.toFixed(4), this.state.location.coords.longitude.toFixed(4)].join(',') : null }`}
              description={'metadata'}
            />
          : null
        }


      </MapView>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', padding: 30, borderTopWidth: 2, borderTopColor: '#212121'}}>
        {this.state.checkpoints.map((checkpoint,idx) =>
          <Icon
            key={idx}
            name={checkpoint.visited ? 'star': 'star'}
            type='font-awesome'
            color={checkpoint.visited ? 'gold': '#212121'}
            onPress={() => console.log(checkpoint.name)}
          />
        )}

      </View>
    </View>
    );
  }
}
