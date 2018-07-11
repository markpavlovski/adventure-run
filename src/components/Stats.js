import React, {Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import StatsCard from './StatsCard'

const data= [1,2,3,4,5]

const Stats = props => (
  <View style={styles.stats}>
    <View style={styles.header}>
      <Text style={styles.headerText}>History</Text>
    </View>
    <FlatList
      style={styles.content}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <StatsCard/>}
    />
  </View>
)

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


export default Stats
