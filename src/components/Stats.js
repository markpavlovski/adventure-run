import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllRuns } from '../actions'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'
import RunCard from './RunCard'
import RunCardTop from './RunCardTop'
import RunCardBottom from './RunCardBottom'


class Stats extends Component {


  render(){
    const renderList = [<RunCardTop/>,...this.props.allRuns.map(run => <RunCard data={run}/>),<RunCardBottom/>]

    return (
      <View style={styles.stats}>
        <View style={styles.header}>
          <View style={styles.displayBox}></View>
        </View>
        <FlatList
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
    this.title = {
      isTitle: true
    }
  }



  componentDidMount(){
    this.props.getAllRuns()
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
    marginTop: -180,
    marginBottom: -150,
    zIndex: -1
  },
  displayBox: {
     height: 80 ,
     backgroundColor: 'white',
     shadowColor: 'black',
     shadowRadius: 20,
     shadowOpacity: .2,
     shadowOffset: {width: 0, height: -5},
   }
})



const mapDispatchToProps = dispatch => bindActionCreators({getAllRuns}, dispatch)
const mapStateToProps = ({allRuns}) => ({allRuns})
export default connect(mapStateToProps, mapDispatchToProps)(Stats)
