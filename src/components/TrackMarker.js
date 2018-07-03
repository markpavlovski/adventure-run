import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setFirstTrack } from '../actions'



const TrackMarker = ({track, setShowScrollList, triggerShowAnimation, setFirstTrack}) => (
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

const mapDispatchToProps = dispatch => bindActionCreators({setFirstTrack}, dispatch)
export default connect(null,mapDispatchToProps)(TrackMarker)
