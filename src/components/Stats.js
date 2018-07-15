import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllRuns } from '../actions'
import { STATIC_MAPS_API_KEY } from '../keys'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'
import RunCard from './RunCard'
import RunCardTop from './RunCardTop'
import RunCardBottom from './RunCardBottom'
import StatsMap from './StatsMap'

import moment from 'moment'



class Stats extends Component {


  render(){
    const renderList = [
      <RunCardTop/>,
      ...this.props.allRuns
      .map(run => <RunCard data={run} toggleInfo={this.toggleInfo} info={this.state.activeId}/>),
      <RunCardBottom/>
    ]

    const allRuns = this.props.allRuns

    const activeRun = allRuns.length ? this.findActiveRun(allRuns) : {}

    const {
      run_shortid,
      created_at,
      latlong,
      name,
      time,
      distance,
      checkpoints,
      path,
    } = activeRun

    const completed = checkpoints ? !checkpoints.find(el => !el.checkpoint_time) : false


    return (
      <View style={styles.stats}>
        <View style={styles.header}>
          <View style={styles.mapContainer}>
            {latlong ? <StatsMap path={path} checkpoints={checkpoints} latlong={latlong} registerCallback={this.registerCallback} fit={this.fitToMarkers}/> : null}
          </View>
          <View style={styles.displayBox}>
            <Text style={styles.trackName}>{name}</Text>
            <Text style={styles.runStartTime}>{moment(created_at).format("ddd MMM DD, h:mm a")}</Text>
            <View style={styles.runStats}>
              <Text style={styles.runStat}>{time}</Text>
              <Text style={styles.runStat}>{distance} mi</Text>
              <Text style={styles.runStat}>{completed ? 'Complete' : 'Incomplete'}</Text>
            </View>
            {/* <Text>{completed ? 'Completed Full Track' : 'Completed Partial Track'}</Text> */}
            {/* {checkpoints.sort((a,b)=>a.checkpoint_id - b.checkpoint_id).map((checkpoint,idx) => <Text key={checkpoint.id}>{idx+1} : {checkpoint.checkpoint_time}</Text>)} */}

          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.content}
          data={renderList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => item}
        />
      </View>
    )
  }


  constructor(){
    super()
    this.state = {
      activeId: false
    }
    this.fitToMarkers = _ => _
  }

  toggleInfo = (shortid) => {
    this.setState({activeId: shortid})
    this.markerTimeout = setTimeout(() => this.fitToMarkers(),100)
    console.log(shortid)
  }

  findActiveRun = (allRuns) => {
    return allRuns.find(run => run.run_shortid === this.state.activeId) || allRuns[0]
  }

  registerCallback = fitToMarkers => {
    this.fitToMarkers = fitToMarkers
  }




  componentDidMount(){
    this.props.getAllRuns()
  }

  componentWillUnmount(){
    clearInterval(this.markerTimeout)
  }

}

const SCREEN_WIDTH = Dimensions.get("window").width;


const styles = StyleSheet.create({
  stats: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 300,
    backgroundColor: '#378287',
    justifyContent: 'flex-end',
    marginBottom: 0,
    marginTop: -15,
    marginLeft: -15,
    marginRight: -15,
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: .3,
    shadowOffset: {width: 0, height: 15},
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 3,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -190,
    marginBottom: -150,
    zIndex: -1
  },
   mapContainer: {
     flex: 1,
     backgroundColor: 'rgb(225,225,225)'
   },
   displayBox: {
      height: 80 ,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowRadius: 20,
      shadowOpacity: .2,
      shadowOffset: {width: 0, height: -5},
      alignItems: 'flex-start',
      paddingLeft: 30,
      paddingTop: 10
    },
    trackName: {
      fontSize: 22,
      fontWeight: '500',
      letterSpacing: 0.5
    },
    runStats: {
      marginTop: 4,
      flexDirection: 'row',
    },
    runStartTime: {
      fontWeight: '300'
    },
    runStat: {
      marginRight: 15,
      fontSize: 12,
      fontWeight: '300'
    }

})



const mapDispatchToProps = dispatch => bindActionCreators({getAllRuns}, dispatch)
const mapStateToProps = ({allRuns}) => ({allRuns})
export default connect(mapStateToProps, mapDispatchToProps)(Stats)
