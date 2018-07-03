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
      triggerShowAnimation()
      setFirstTrack(track)
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

const mapDispatchToProps = dispatch => bindActionCreators({setFirstTrack}, dispatch)
export default connect(null,mapDispatchToProps)(TrackMarker)
