import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { Icon } from 'react-native-elements'
import NavbarIcon from './NavbarIcon'

const Navbar = props => (
  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderTopWidth: 1, borderTopColor: 'rgb(225,225,225)', height: 50}}>
    {iconData.map((icon, idx) => <NavbarIcon {...icon} key={idx} size={20}/>)}
  </View>
)


const iconData = [
  {
    name:'user',
    type:'simple-line-icon',
    label: 'Me',
  },
  {
    name:'badge',
    type:'simple-line-icon',
    label: 'Badges',
  },
  {
    name:'location-pin',
    type:'simple-line-icon',
    label: 'Start',
    color: '#378287'
  },
  {
    name:'chart',
    type:'simple-line-icon',
    label: 'Stats',
  },
  {
    name:'people',
    type:'simple-line-icon',
    label: 'Guild',
  }
]



export default Navbar
