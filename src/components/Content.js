import React, {Component} from "react"
import {connect} from 'react-redux'
import { Platform, StyleSheet, Text, View } from "react-native"
import { MapView, Constants, Location, Permissions  } from "expo"
import { Icon } from 'react-native-elements'

import Me from './Me'
import Badges from './Badges'
import Map from './Map'
import Stats from './Stats'
import Guild from './Guild'


const Content = props => (
  <View style={{flex: 1}}>
    {props.activePage === 0 ? <Me/> : null}
    {props.activePage === 1 ? <Badges/> : null}
    {props.activePage === 2 ? <Map/> : null}
    {props.activePage === 3 ? <Stats/> : null}
    {props.activePage === 4 ? <Guild/> : null}
  </View>
)


const mapStateToProps = ({activePage}) => ({activePage})
export default connect(mapStateToProps)(Content)
