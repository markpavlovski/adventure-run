import { request } from './helpers'
import { AsyncStorage } from 'react-native'


export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'
export const CHANGE_ACTIVE_SCROLL_ITEM = 'CHANGE_ACTIVE_SCROLL_ITEM'
export const UPDATE_ACTIVE_CHECKPOINTS = 'UPDATE_ACTIVE_CHECKPOINTS'
export const GET_TRACK_DATA = 'GET_TRACK_DATA'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_CLOSEST_DISTANCE = 'SET_CLOSEST_DISTANCE'
export const UPDATE_RUNS = 'UPDATE_RUNS'

const LATITUDE_DELTA =  0.04
const LONGITUDE_DELTA =  0.04

export const changeActivePage = pageId => (
  dispatch => {
    dispatch({
      type: CHANGE_ACTIVE_PAGE,
      payload: pageId
    })
  }
)

export const changeActiveScrollItem = itemIndex => (
  dispatch => {
    dispatch({
      type: CHANGE_ACTIVE_SCROLL_ITEM,
      payload: itemIndex
    })
  }
)

export const updateActiveCheckpoints = (checkpoints) => (
  dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_CHECKPOINTS,
      payload: checkpoints
    })
  }
)

export const getTrackData = () => {
  console.log('getTrackData');
  return (
  dispatch => {
    request('/tracks')
    .then(response => {
      const tracks = response.data.data.map(track=>{
        return ({...track,
          latitude: track.latlong.split(', ')[0]*1,
          longitude: track.latlong.split(', ')[1]*1,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          id: track.id - 1
        })
      })
      const promises = tracks.map(track => request(`/tracks/${track.id + 1}/checkpoints`))
      Promise.all(promises)
      .then(allCheckpoints => {
        const checkpointsArray = allCheckpoints.map(response => response.data.data.map( checkpoint => ({...checkpoint,
          latitude: checkpoint.latlong.split(', ')[0]*1,
          longitude: checkpoint.latlong.split(', ')[1]*1,
        })))
        const tracksWithCheckpoints = tracks.map((track, idx) => ({...track, checkpoints: checkpointsArray[idx]}))
        dispatch({
          type: GET_TRACK_DATA,
          payload: tracksWithCheckpoints
        })
      })
      .catch(error => console.log('Error in retreiving checkpoints'))
    })
    .catch(error => console.log('Nope'))
  }
)}



export const login = (email,password) => (
  dispatch => {
    request('/auth/token', 'post', {email, password})
    .then(response => {
      const {token} = response.data
      return AsyncStorage.setItem('token', token)
      .then(response => {
        dispatch({
          type: LOGIN,
          payload: {token}
        })
        return response
      })
      .then(dispatch(getTrackData()))
      .catch(error => '')
    })
    .catch(error => console.log('rejected: incorrect password'))
  }
)

export const loginIfTokenPresent = () => (
  dispatch => {
    request('/auth/token')
    .then(response => {
      return AsyncStorage.getItem('token')
      .then(token => {
        dispatch({
          type: LOGIN,
          payload: {token}
        })
        return token
      })
      .then(dispatch(getTrackData()))
      .catch(error => '')
    })
    .catch(error => console.log('No token present'))
  }
)

export const logout = () => (
  dispatch => {
    AsyncStorage.setItem('token', '')
    .catch(error => 'logout error')
    dispatch({
      type: LOGOUT,
    })
    dispatch(changeActivePage(2))
  }
)


export const setClosestDistance = (distance) => (
  dispatch => {
    dispatch({
      type: SET_CLOSEST_DISTANCE,
      payload: {distance}
    })
  }
)

export const getAllRuns = () => (
  dispatch => {
    request('/runs')
    .then(response => {
      const allRuns = response.data.data.reverse()
      dispatch({
        type: UPDATE_RUNS,
        payload: allRuns
      })
    })
    .catch(error => console.log('Error getting runs'))
  }
)
