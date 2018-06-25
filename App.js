import React, {Component} from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MapView, Constants, Location, Permissions  } from "expo";
export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    // console.log(this.state.location.coords.latitude);
    return (
      <MapView
        provider='google'
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 47.667289,
          longitude: -122.383815,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: 47.667289,
            longitude: -122.383815
          }}
          title={`${this.state.location ? [this.state.location.coords.latitude.toFixed(4), this.state.location.coords.longitude.toFixed(4)].join(',') : null }`}
          description={'metadata'}
        />
      </MapView>

    );
  }
}
