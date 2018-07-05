import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const TrackMarker = ({track, setShowScrollList, animateSlide, showCheckpoints}) => (
  <MapView.Marker
    coordinate={track}
    onPress = {()=>{
      setShowScrollList(true)
      animateSlide(NONE,HALF,track.id)
      showCheckpoints(track.id)
    }}
  >
    <MapView.Callout tooltip={true} />
  </MapView.Marker>
)

const NONE = 'NONE'
const HALF = 'HALF'
const FULL = 'FULL'

export default TrackMarker
