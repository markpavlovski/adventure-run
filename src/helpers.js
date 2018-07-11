
import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { BACKEND_SERVER } from './settings'


export const getDistance = (a,b) => {

  if (!(a && b)) return 0
  if (!(a.latitude && a.longitude && b.latitude && b.longitude)) return 0

  const R = 6371000 // metres
  const φ1 = a.latitude * (Math.PI / 180)
  const φ2 = b.latitude * (Math.PI / 180)
  const Δφ = φ2 - φ1
  const Δλ = (b.longitude-a.longitude)* (Math.PI / 180)
  const α = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1-α))
  const d = R * c
  return d
}


class AuthenticationWrapper extends Component{
  constructor(props){
    super(props)

    this.state = {
      authState: null,
      authStatePending: true
    }
  }

  handleAuthState = (authState) => {
    this.setState({ authState, authStatePending: false})
  }

  componentWillMount(){
    const authState = AuthenticationService.getAuthState()
    this.setState({ authState, authStatePending: authState ? false : true })

    AuthenticationService.registerEvent(this.handleAuthState)
  }

  componentWillUnmount(){
    AuthenticationService.deRegisterEvent(this.handleAuthState)
  }

  render(){
    const { Component, ...props} = this.props
    return (
      <Component {...props} authState={this.state.authState} authStatePending={this.state.authStatePending}/>
    )
  }

}

export const withAuthentication = (Component) =>
  (props) =>
    <AuthenticationWrapper Component={Component} {...props}/>




class AuthService{
  constructor(){
    if(!AuthService.instance){
      this.authState = null
      this.registeredCallbacks = []
      AuthService.instance = this
      return AuthService.instance
    }
    else {
      return AuthService.instance
    }
  }
  setAuthState(val){
    this.authState = val
    this.registeredCallbacks.forEach(cb => cb(this.authState))
  }
  getAuthState(){
    return this.authState
  }
  registerEvent(cb){
    this.registeredCallbacks.push(cb)
  }
  deRegisterEvent(cb){
    this.registeredCallbacks = this.registeredCallbacks.filter(ele => ele !== cb)
  }
}
export const AuthenticationService = new AuthService()

//
// retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('token');
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//    } catch (error) {
//      // Error retrieving data
//    }
// }


// REACT_APP_BACKEND='http://10.0.0.85:3000'
// REACT_APP_BACKEND='http://10.5.82.230:3000'
// REACT_APP_BACKEND='https://adventure-run-backend.herokuapp.com'

export const request = (path, method = 'get', body = null) => {
  let bearerToken = ''
  return AsyncStorage.getItem('token')
  .then(token => {

    console.log('!!!', token)
    if (token) bearerToken = `Bearer ${token}`

    return axios(`${BACKEND_SERVER}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': bearerToken
      },
      data: body
    })
    .then(result => result)
    .catch(function(error){
      if(error.response.status === 401){
        AuthenticationService.setAuthState(null)
      }
      return Promise.reject()
    })
  })

}
