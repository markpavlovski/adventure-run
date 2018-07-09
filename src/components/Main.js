import React, {Component} from 'react'
import { View, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'

import Content from './Content'
import Navbar from './Navbar'

import LoginScreen from './LoginScreen'

const Main = (props) => {
  return (
    <View style={{flex:1}}>
      {console.log('main:',props.token)}
      {props.token
        ?
        <View style={{flex:1}}>
          <Content/>
          <Navbar/>
        </View>
        :
        <LoginScreen/>
      }
    </View>
)}

const mapStateToProps = ({token}) => ({token})
export default connect(mapStateToProps)(Main)
