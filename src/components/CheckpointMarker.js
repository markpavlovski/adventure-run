import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDistance } from '../helpers'

const CheckpointMarker = ({checkpoint, idx, checkpoints, location, colorId}) => {
  let title = null
  if (idx === 0) title = 'Start'
  else if (idx === checkpoints.length - 1) title = 'Finish'
  else title = `Checkpoint ${idx}`
  return (
  checkpoint.visited ?
  <MapView.Marker
    coordinate={checkpoint}
    title={title}
    description={`${getDistance(location.coords, checkpoint).toFixed(0)} meters away`}
    pinColor= 'blue'
  />
  :
  <MapView.Marker
    coordinate={checkpoint}
    title={title}
    description={`${getDistance(location.coords, checkpoint).toFixed(0)} meters away`}
  />
)}

export default CheckpointMarker
