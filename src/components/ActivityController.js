import React, {Component} from "react"
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Constants, Location, Permissions, Audio  } from "expo";
import { Icon } from 'react-native-elements'
import moment from 'moment'


import CustomButton from './CustomButton'
import { getDistance } from '../helpers'
import {updateActiveCheckpoints} from '../actions'



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

  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      speed: (0).toFixed(2),
      pace: (0).toFixed(2),
      inProgress: true,
      location: null,
      coordinates: [],
      completed: false
    }
    this.startTime = null
    this.currentTime = null
    this.sounds = {
      START: require('../assets/start.wav'),
      CHECKPOINT: require('../assets/checkpoint.mp3'),
      STOP: require('../assets/stop.wav'),
      SUBMIT: require('../assets/start.wav')
    }
    this.checkpoints = props.activeCheckpoints
      .map((cp,idx) => ({...cp, id: idx, visited: false, timeStamp: null, distance: 0}))
    // console.log(this.checkpoints)
    // console.log('!!!!', props.trackId)
  }

  componentDidMount() {
    this.setState({startTime: moment()})
    this.timer = setInterval(()=>{
      this.setState({currentTime: moment()})
      this.getLocationAsync()
    },1000)
    this.playSound(this.sounds.START)
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
    this.playSound(this.sounds.STOP)
  }

  handleFinish = () => {
    this.props.resetView()
    this.props.displayRunPath([])
    this.playSound(this.sounds.SUBMIT)
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    this.setState({ location, coordinates: [...this.state.coordinates,location.coords] })
    this.getCurrentSpeed()
    this.examineCheckpoints()
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

  playSound = async (sound) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(sound);
      await soundObject.playAsync();
      await console.log('playing')
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  examineCheckpoints = () => {
    console.log(this.state.completed)

    this.checkpoints = this.checkpoints.map(cp => {
      const distance = getDistance(cp, this.state.location.coords)
      if (distance < 20 && !cp.visited) {
        return this.handleCheckpointVisit(cp)
      }
      return cp
    })

    const visited = this.checkpoints.filter(cp => cp.visited)
    if (visited.length === this.checkpoints.length && !this.state.completed) {
      this.handleCompletion()
    }

    this.props.updateActiveCheckpoints(this.checkpoints)

  }

  handleCheckpointVisit = (checkpoint) => {
    this.playSound(this.sounds.STOP)
    return {...checkpoint, timeStamp: new Date(), visited: true}
  }

  handleCompletion = () => {
    this.setState({completed: true})
    console.log('congrats!!')
    this.props.setShowCompleted(true)
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

const mapDispatchToProps = dispatch => bindActionCreators({updateActiveCheckpoints}, dispatch)
const mapStateToProps = ({trackData, activeCheckpoints}) => ({trackData, activeCheckpoints})
export default connect(mapStateToProps,mapDispatchToProps)(ActivityController)