import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const TrackMarker = ({track, setShowScrollList, triggerShowAnimation}) => (
  <MapView.Marker
    coordinate={track}
    onPress = {()=>{
      setShowScrollList(true)
      triggerShowAnimation(track.id)
    }}
  >
    <MapView.Callout tooltip={true} />
  </MapView.Marker>
)

export default TrackMarker
