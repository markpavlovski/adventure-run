import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDistance } from '../helpers'

const CheckpointMarker = ({checkPoint, idx, checkPoints, location, colorId}) => {
  let title = null
  if (idx === 0) title = 'Start'
  else if (idx === checkPoints.length - 1) title = 'Finish'
  else title = `Checkpoint ${idx}`
  return (
  checkPoint.visited ?
  <MapView.Marker
    coordinate={checkPoint}
    title={title}
    description={`${getDistance(location.coords, checkPoint).toFixed(0)} meters away`}
    pinColor= 'blue'
  />
  :
  <MapView.Marker
    coordinate={checkPoint}
    title={title}
    description={`${getDistance(location.coords, checkPoint).toFixed(0)} meters away`}
  />
)}

export default CheckpointMarker
