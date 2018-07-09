import React, {Component} from 'react'
import { View, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginIfTokenPresent } from '../actions'

import Content from './Content'
import Navbar from './Navbar'

import LoginScreen from './LoginScreen'

class Main extends Component {

  componentDidMount(){
    this.props.loginIfTokenPresent()
  }

  render(){
    console.log('current token: ', this.props.token)
    return (
      <View style={{flex:1}}>
        {this.props.token
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

}



const mapDispatchToProps = dispatch => bindActionCreators({ loginIfTokenPresent }, dispatch)
const mapStateToProps = ({token}) => ({token})
export default connect(mapStateToProps,mapDispatchToProps)(Main)
