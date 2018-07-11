import React, {Component} from "react"
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native"
import { Icon } from 'react-native-elements'
import { STATIC_MAPS_API_KEY } from '../keys'
import StatsMap from './StatsMap'

import moment from 'moment'

class StatsCard extends Component {

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
      <View style={styles.statsCard}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{moment(created_at).format("MMM DD, h:mm a")}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={()=>this.setState({isOpen: !this.state.isOpen})}
        >
          <Image
            style={styles.image}
            source={{uri: getPath(latlong)}}
          />
        </TouchableWithoutFeedback>
        <Text>{name}</Text>
        {this.state.isOpen ? <View>
        <Text>{time}</Text>
        <Text>{distance}</Text>
        <Text>{completed ? 'Completed Full Track' : 'Completed Partial Track'}</Text>
        {checkpoints.sort((a,b)=>a.checkpoint_id - b.checkpoint_id).map((checkpoint,idx) => <Text key={checkpoint.id}>{idx+1} : {checkpoint.checkpoint_time}</Text>)}
        <StatsMap path={path} checkpoints={checkpoints} latlong={latlong}/>
      </View> : null
      }
      </View>
    )
  }

  constructor (){
    super()
    this.state = {
      isOpen: false
    }

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
  statsCard: {
    minHeight: 120,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(55,130,135,1)'
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(55,130,135,1)',
  }
})


export default StatsCard
