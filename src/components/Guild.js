import React, {Component} from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { Icon } from 'react-native-elements'


const Guild = props => (
  <View style={styles.guild}>
    <Text style={styles.title}>GUILD</Text>
    <Image style={styles.image}
      source={require('../assets/lock.png')}
    />
    <Text style={styles.premium}>Upgrade to Premium</Text>

  </View>
)


const styles = StyleSheet.create({
  guild: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    opacity: 0.2
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 2,
    padding: 40,
    color: 'rgba(0,0,0,0.4)'
  },
  premium: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    padding: 40,
    color: '#378287',

  }
})


export default Guild
