import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllRuns } from '../actions'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'


class Stats extends Component {

  render(){
    return (
      <View style={styles.stats}>
        <FlatList
          style={styles.content}
          data={[this.title,...this.props.allRuns]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => item.isTitle ? this.renderTitle() : <StatsCard data={item}/>}
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
    height: 120,
    backgroundColor: '#378287',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(55,130,135)',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 0,
    marginBottom: 40,
    marginTop: -15,
    marginLeft: -15,
    marginRight: -15,
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
