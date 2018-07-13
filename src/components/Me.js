import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, getAllRuns } from '../actions'
import { hhmmssToSeconds, secondsToHhmmss } from '../helpers'


class Me extends Component {

  componentDidMount(){
    this.props.getAllRuns()
  }

  render(){
    const runData = this.props.allRuns
    return (
      <View style={{flex: 1, backgroundColor: '#EB5E55', justifyContent: 'flex-end'}}>
        <Text style={{color: 'white'}}>{this.totalDistance(runData)} km</Text>
        <Text style={{color: 'white'}}>{this.totalTime(runData)}</Text>
        <View
          style={{
            zIndex: 99,
            borderRadius: 30,
            justifyContent: 'center',
            margin: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
            color: 'white'


          }}
          onPress={()=>{
            console.log('goodbye:',this.props.token)
            this.props.logout()
          }}
          >
            LOGOUT
          </Text>
        </View>
      </View>
    )
  }

  totalDistance = runData => runData.reduce((acc,run)=>acc+parseFloat(run.distance), 0).toFixed(2)

  totalTime = runData => {
    const totalTime = runData
      .map(run => hhmmssToSeconds(run.time))
      .reduce((acc,time)=>acc+time,0)
    return secondsToHhmmss(totalTime)
  }


}



const mapStateToProps = ({token, allRuns}) => ({token, allRuns})
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getAllRuns }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Me)
