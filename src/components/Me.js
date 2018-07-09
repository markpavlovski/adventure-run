import React, {Component} from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'


const Me = props => (
  <View style={{flex: 1, backgroundColor: '#EB5E55', justifyContent: 'flex-end'}}>
    <View
      style={{
        zIndex: 99,
        borderRadius: 30,
        justifyContent: 'center',
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
      }}
    >
      <Text style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'


      }}
      onPress={()=>{
        console.log('goodbye:',props.token)
        props.logout()
      }}
      >
        LOGOUT
      </Text>
    </View>
  </View>
)

const mapStateToProps = ({token}) => ({token})
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Me)
