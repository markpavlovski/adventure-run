import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Constants, Location, Permissions  } from "expo";
import { Icon } from 'react-native-elements'

import moment from 'moment'


import CustomButton from './CustomButton'
import { getDistance } from '../helpers'


class ActivityController extends Component {

  render(){
  const SCREEN_HEIGHT = Dimensions.get("window").height
  const CONTAINER_HEIGHT = 150
  const MARGIN_TOP = SCREEN_HEIGHT - CONTAINER_HEIGHT - 80
  return (
    <View style={{
      backgroundColor: 'rgba(55,130,135,.9)',
      height: CONTAINER_HEIGHT,
      margin: 20,
      marginTop: MARGIN_TOP,
      marginBottom: - CONTAINER_HEIGHT - MARGIN_TOP,
      zIndex: 99,
      borderRadius: 30,
      justifyContent: 'center',
    }}
    >
      <Text style={styles.time}>{this.displayTimer()}</Text>
      <Text style={styles.text}>{`${this.state.speed} km/h, ${this.state.pace} min/km`}</Text>
      {this.state.inProgress ? <CustomButton text={'STOP'} action={this.handleStop}/> : <CustomButton text={'FINISH'} action={this.handleFinish}/>}
    </View>
  )
  }

  constructor() {
    super()
    this.state = {
      time: 0,
      speed: (0).toFixed(2),
      pace: (0).toFixed(2),
      inProgress: true,
      location: null,
      coordinates: []
    }
    this.startTime = null
    this.currentTime = null
  }

  componentDidMount() {
    this.setState({startTime: moment()})
    this.timer = setInterval(()=>{
      this.setState({currentTime: moment()})
      this.getLocationAsync()
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  displayTimer = () => {
    if (!this.state.currentTime && !this.state.startTime) return null

    let seconds = moment(this.state.currentTime).diff(this.state.startTime, 'seconds') % 60
    seconds = seconds < 10 ? '0'+seconds : seconds
    let minutes = moment(this.state.currentTime).diff(this.state.startTime, 'minutes') % 60
    minutes = minutes < 10 ? '0'+minutes : minutes
    let hours = moment(this.state.currentTime).diff(this.state.startTime, 'hours')
    hours = hours < 10 ? '0'+hours : hours

    return `${hours} : ${minutes} : ${seconds}`
  }

  handleStop = () => {
    clearInterval(this.timer)
    this.setState({inProgress: false})
    this.props.displayRunPath(this.state.coordinates)
  }

  handleFinish = () => {
    this.props.resetView()
    this.props.displayRunPath([])
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    this.setState({ location, coordinates: [...this.state.coordinates,location.coords] })
    this.getCurrentSpeed()
  }

  getCurrentSpeed = () => {
    const coordinates = this.state.coordinates
    if (coordinates.length > 4) {
      const sample = coordinates.filter((el,idx,arr) => idx > arr.length - 4)
      let distance = 0
      for (let i = 1; i < sample.length; i++){
        distance += getDistance(sample[i], sample[i-1])
      }
      const speed = (distance / 3 * 60 / 1000).toFixed(2)
      const pace = 60 / speed < 20 ? (60 / speed).toFixed(2) : (0).toFixed(2)
      this.setState({speed, pace})
    } else {
      this.setState({speed: (0).toFixed(2), pace: (0).toFixed(2)})
    }
  }


}



const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  time: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10
  }
})


export default ActivityController
