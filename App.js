import React, {Component} from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { MapView, Constants, Location, Permissions  } from "expo"
import { Icon } from 'react-native-elements'

import Content from './components/Content'
import Navbar from './components/Navbar'

class App extends Component {
  render = () => (
    <View style={{flex:1}}>
      <Content/>
      <Navbar/>
    </View>
  )
}

export default App
