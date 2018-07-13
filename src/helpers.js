
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


export const validateBadge = (badgeId, runData) => {
  const { distance, time, path, times } = runData
  return true
}

export const hhmmssToSeconds = hhmmss => {
  const date = hhmmss.split(':').map(el=>parseInt(el))
  const seconds = date[0]*60*60 + date[1]*60 + date[2]
  return seconds
}

export const secondsToHhmmss = seconds => {
  let hours = `${Math.floor(seconds / 3600)}`
  hours = hours < 10 ? '0'+hours : hours

  let minutes = Math.floor(seconds / 60) % 60
  minutes = minutes < 10 ? '0'+minutes : minutes

  let secs = seconds % 60
  secs = secs < 10 ? '0'+ secs : secs

  return `${hours}:${minutes}:${secs}`
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
