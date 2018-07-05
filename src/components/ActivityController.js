import React, {Component} from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import { Icon } from 'react-native-elements'
import moment from 'moment'


import CustomButton from './CustomButton'


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
      speed: 10,
      pace: 6,
      inProgress: true
    }
    this.startTime = null
    this.currentTime = null
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
    console.log('hiii');
    clearInterval(this.timer)
    this.setState({inProgress: false})
  }

  handleFinish = () => {
    console.log('finished!')
    this.props.resetView()
  }


  componentDidMount() {
    this.setState({startTime: moment()})
    this.timer = setInterval(()=>{
      this.setState({currentTime: moment()})
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
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
