import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllRuns } from '../actions'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'
import RunCard from './RunCard'
import RunCardBlank from './RunCardBlank'


class Stats extends Component {


  render(){
    const renderList = [this.title,<RunCardBlank/>,...this.props.allRuns.map(run => <RunCard data={run}/>),<RunCardBlank/>]

    return (
      <View style={styles.stats}>
        <FlatList
          style={styles.content}
          data={renderList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => item.isTitle ? this.renderTitle() : item}
        />
      </View>
    )
  }

  renderTitle = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Activities</Text>
    </View>
  )

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

const styles = StyleSheet.create({
  stats: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 100,
    backgroundColor: '#378287',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(55,130,135)',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 0,
    marginBottom: 0,
    marginTop: -15,
    marginLeft: -15,
    marginRight: -15,
    shadowColor: 'black',
    shadowOpacity: .4,
    shadowRadius: 25,
    shadowOffset: {height: 15},
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 2,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  }
})


const mapDispatchToProps = dispatch => bindActionCreators({getAllRuns}, dispatch)
const mapStateToProps = ({allRuns}) => ({allRuns})
export default connect(mapStateToProps, mapDispatchToProps)(Stats)
