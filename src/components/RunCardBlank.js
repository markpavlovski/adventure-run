import React, {Component} from "react"
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native"
import { Icon } from 'react-native-elements'
import { STATIC_MAPS_API_KEY } from '../keys'
import StatsMap from './StatsMap'

import moment from 'moment'

class RunCardBlank extends Component {

  render(){

    return (
      <View style={styles.runCard}>

        <View style={styles.date}>

        </View>

        <TouchableWithoutFeedback style={styles.imageContainer}>
          <Image
            style={styles.blankImage}
            source={{uri: getPath('47.668246, -122.383621')}}
          />
        </TouchableWithoutFeedback>
        <View style={styles.blankTrackTitle}>
        </View>
      </View>
    )

  }

}

const getPath = latlong => {
  const position = latlong.split(', ').join(',')
  // const center = '63.259591,-144.667969'
  const center = position
  const zoom = 13
  const size = 200
  const markerLocation = position
  const key = STATIC_MAPS_API_KEY
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}x${size}&markers=size:mid%7C${markerLocation}&key=${key}`
}

const styles = StyleSheet.create({
  runCard: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    height: 30,
    backgroundColor: 'rgba(55,130,135,1)',
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    color: 'white',
    lineHeight: 30,
  },
  blankImage: {
    width: 80,
    borderRadius: 40,
    opacity: 0,
  },
  imageContainer: {
    width: 80
  },
  blankTrackTitle: {
    flex: 1,
    borderLeftWidth: 2,
    height: 30,
    marginLeft: -40,
    zIndex: -1,
    justifyContent: 'center',
    paddingLeft: 50,
    borderColor: 'rgba(55,130,135,1)',
  },
  date: {
    width: 55
  }
})


export default RunCardBlank
