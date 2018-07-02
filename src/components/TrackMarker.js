import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'


const TrackMarker = ({track, setShowScrollList, animateStyle}) => (
  <MapView.Marker
    coordinate={track}
    title={`${track.name}`}
    description={`${track.length.toFixed(1)} km / ${(track.length * 0.621371).toFixed(1)} mi`}
    onPress = {()=>{
      setShowScrollList(true)
      animateStyle()
    }}
  >
    <MapView.Callout tooltip={true} />

      {/* <MapView.Callout>
        <View style={{padding: 20}}>
          <Text>
            {`${track.name}`}
          </Text>
          <Text>
            {`${track.length.toFixed(1)} km / ${(track.length * 0.621371).toFixed(1)} mi`}
          </Text>
        </View>
      </MapView.Callout> */}
  </MapView.Marker>
)


export default TrackMarker
