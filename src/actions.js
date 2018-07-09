import { request } from './helpers'
import { AsyncStorage } from 'react-native'


export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'
export const CHANGE_ACTIVE_SCROLL_ITEM = 'CHANGE_ACTIVE_SCROLL_ITEM'
export const UPDATE_ACTIVE_CHECKPOINTS = 'UPDATE_ACTIVE_CHECKPOINTS'
export const GET_TRACK_DATA = 'GET_TRACK_DATA'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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
    request('/tracks/1/checkpoints')
    .then(response => {
      console.log(response.data.data)
      const checkpoints = response.data.data
      // .map( checkpoint => ({...checkpoint,
      //   //   latitude: track.latlong.split(', ')[0]*1,
      // }))
      .map(checkpoint=>({...checkpoint,
        latitude: checkpoint.latlong.split(', ')[0]*1,
        longitude: checkpoint.latlong.split(', ')[1]*1,
      }))
      dispatch({
        type: UPDATE_ACTIVE_CHECKPOINTS,
        payload: checkpoints
      })
    })
    .catch(()=>console.log('checkpoints not found'))

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
        })
      })
      const promises = tracks.map(track => request(`/tracks/${track.id}/checkpoints`))
      Promise.all(promises)
      .then(allCheckpoints => {
        const checkpointsArray = allCheckpoints.map(response => response.data.data.map( checkpoint => ({...checkpoint,
          latitude: checkpoint.latlong.split(', ')[0]*1,
          longitude: checkpoint.latlong.split(', ')[1]*1,
        })))
        const tracksWithCheckpoints = tracks.map((track, idx) => ({...track, checkpoints: checkpointsArray[idx]}))
        console.log(tracksWithCheckpoints);
        dispatch({
          type: GET_TRACK_DATA,
          payload: tracksWithCheckpoints
        })
      })
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
      .then(() => {
        dispatch({
          type: LOGIN,
          payload: {token}
        })
      })
      .catch(error => '')
    })
    .then(dispatch(getTrackData()))
    .catch(error => console.log('rejected: incorrect password'))
  }
)

export const loginIfTokenPresent = () => (
  dispatch => {
    request('/auth/token')
    .then(response => {
      return AsyncStorage.getItem('token')
      .then((token) => {
        dispatch({
          type: LOGIN,
          payload: {token}
        })
      })
      .catch(error => '')
    })
    .then(dispatch(getTrackData()))
    .catch(error => console.log('No token present'))
  }
)

export const logout = () => (
  dispatch => {
    AsyncStorage.setItem('token', '')
    dispatch({
      type: LOGOUT,
    })
    dispatch(changeActivePage(2))
  }
)
