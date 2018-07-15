import React, {Component} from "react"
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native"
import { Icon } from 'react-native-elements'
import { STATIC_MAPS_API_KEY } from '../keys'
import StatsMap from './StatsMap'

import moment from 'moment'

class RunCard extends Component {

  render(){

    const {
      created_at,
      latlong,
      name,
      time,
      distance,
      checkpoints,
      path
    } = this.props.data

    const completed = !checkpoints.find(el => !el.checkpoint_time)

    return (
      <View style={styles.runCard} onPress={this.toggleDetails}>

        <View style={styles.date} onPress={this.toggleDetails}>
          <Text style={styles.day} onPress={this.toggleDetails}>{moment(created_at).format("ddd")}</Text>
          <Text style={styles.month} onPress={this.toggleDetails}>{moment(created_at).format("MMM DD")}</Text>
        </View>

        <TouchableWithoutFeedback style={styles.imageContainer} onPress={this.toggleDetails}>
          <Image
            style={styles.image}
            source={{uri: getPath(latlong)}}
          />
        </TouchableWithoutFeedback>
         <View style={styles.trackTitle} onPress={this.toggleDetails}>
          <Text onPress={this.toggleDetails} style={styles.trackTitleText}>{name}</Text>
          {this.state.isOpen ? <View style={styles.content} onPress={this.toggleDetails}>

            <Text>{time}</Text>
            <Text>{distance}</Text>
            <Text>{completed ? 'Completed Full Track' : 'Completed Partial Track'}</Text>
            {/* {checkpoints.sort((a,b)=>a.checkpoint_id - b.checkpoint_id).map((checkpoint,idx) => <Text key={checkpoint.id}>{idx+1} : {checkpoint.checkpoint_time}</Text>)} */}
            <StatsMap path={path} checkpoints={checkpoints} latlong={latlong}/>

          </View> : null}
        </View>
      </View>
    )

  }

  constructor (){
    super()
    this.state = {
      isOpen: false
    }
  }

  toggleDetails = () => {
    console.log('pressed')
    this.setState({isOpen: !this.state.isOpen})
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(55,130,135,1)',
  },
  imageContainer: {
    width: 80
  },
  trackTitle: {
    flex: 1,
    borderLeftWidth: 2,
    minHeight: 110,
    marginLeft: -40,
    zIndex: -1,
    justifyContent: 'center',
    paddingLeft: 50,
    borderColor: 'rgba(55,130,135,1)',
  },
  date: {
    width: 55,
    alignItems: 'center',
    paddingRight: 10,
  },
  day: {
    fontWeight: '600'
  },
  month: {
    fontWeight: '600'
  },
  trackTitleText: {
    fontWeight: '600'
  },
  content: {

  }
})


export default RunCard
