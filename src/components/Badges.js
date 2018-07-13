import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllBadges } from '../actions'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'


class Badges extends Component {

  render(){
    return (
      <View style={styles.stats}>
        <FlatList
          style={styles.content}
          data={[this.title,...this.props.allBadges]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => item.isTitle ? this.renderTitle() : <Text>{item.count} x {item.name}</Text>}
        />
      </View>
    )
  }

  renderTitle = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Badges</Text>
    </View>
  )

  constructor(){
    super()
    this.title = {
      isTitle: true
    }
  }

  componentDidMount(){
    this.props.getAllBadges()
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
    marginBottom: 40,
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


const mapDispatchToProps = dispatch => bindActionCreators({getAllBadges}, dispatch)
const mapStateToProps = ({allBadges}) => ({allBadges})
export default connect(mapStateToProps, mapDispatchToProps)(Badges)
