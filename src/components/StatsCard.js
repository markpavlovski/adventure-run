import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { Icon } from 'react-native-elements'


const StatsCard = props => (
  <View style={styles.statsCard}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Monday, July 10, 5:45 PM</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  statsCard: {
    minHeight: 120,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(55,130,135,1)'
  },
  header: {
    height: 30,
    backgroundColor: 'rgba(55,130,135,1)',
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    color: 'white',
    lineHeight: 30,
  }
})


export default StatsCard
