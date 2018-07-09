import React, {Component} from 'react'
import { View, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/store'
import Content from './src/components/Content'
import Navbar from './src/components/Navbar'

import LoginScreen from './src/components/LoginScreen'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTMxMDA5MzAxfQ.m3QJX6UgDNcaidopvMUPOKZoU5S72wInoVTzYqqOO5I'
AsyncStorage.setItem('token', token)

const App = () => {
  return (
  <Provider store={store}>
    <View style={{flex:1}}>
      {true
        ?
        <LoginScreen />
        :
        <View style={{flex:1}}>
          <Content/>
          <Navbar/>
        </View>
      }
    </View>
  </Provider>
)}


export default App
