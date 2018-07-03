import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { MapView } from 'expo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDistance } from '../helpers'

const CheckpointMarker = ({checkPoint, idx, checkPoints}) => {
  let title = null
  if (idx === 0) title = 'Start'
  else if (idx === checkPoints.length - 1) title = 'Finish'
  else title = `checkPoint ${idx}`
  return (
  <MapView.Marker
    coordinate={checkPoint}
    title={title}
    description={`${getDistance(checkPoints[0], checkPoint).toFixed(0)} meters away`}
  />
)}

export default CheckpointMarker
