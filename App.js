import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
export default class App extends React.Component {

  render() {
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
          title={'marker.stationName'}
          description={'metadata'}
        />
      </MapView>

    );
  }
}
