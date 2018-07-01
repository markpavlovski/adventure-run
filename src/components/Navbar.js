import React from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import NavbarIcon from './NavbarIcon'

import {changeActivePage} from '../actions'


const Navbar = props => (
  <View style={styles.navbar}>
    {iconData.map((icon, idx) =>
      <NavbarIcon
        {...icon}
        key={idx}
        size={20}
        onPress={()=>props.changeActivePage(icon.id)}
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
      />)}
  </View>
)

const iconData = [
  {
    name:'user',
    type:'simple-line-icon',
    label: 'Me',
    id: 0,
  },
  {
    name:'badge',
    type:'simple-line-icon',
    label: 'Badges',
    id: 1,
  },
  {
    name:'map-marker',
    type:'font-awesome',
    label: 'Start',
    color: '#378287',
    size: 60,
    id: 2,
  },
  {
    name:'chart',
    type:'simple-line-icon',
    label: 'Stats',
    id: 3,
  },
  {
    name:'people',
    type:'simple-line-icon',
    label: 'Guild',
    id: 4,
  }
]


const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: 'rgb(225,225,225)',
    height: 50
  }
})

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage}, dispatch)
export default connect(null,mapDispatchToProps)(Navbar)
