import { AsyncStorage } from 'react-native'
import { combineReducers } from 'redux'
import { request } from './helpers'
import { CHANGE_ACTIVE_PAGE, CHANGE_ACTIVE_SCROLL_ITEM, UPDATE_ACTIVE_CHECKPOINTS } from './actions'


const LATITUDE_DELTA =  0.04
const LONGITUDE_DELTA =  0.04
const INITIAL_PAGE = 2
const INITIAL_SCROLL_ITEM = 0



const GREEN_LAKE = [
  '47.68149, -122.32894',
  '47.68215, -122.33998',
  '47.67553, -122.34627',
  '47.67163, -122.34238',
  '47.67574, -122.33385',
  '47.68003, -122.32940'
].map(latlang => ({
  latitude: parseFloat(latlang.split(', ')[0]),
  longitude: parseFloat(latlang.split(', ')[1])
}))

const ALL_THE_PARKS = [
  '-122.3194980, 47.6179810',
  '-122.3190093, 47.6253467',
  '-122.3145890, 47.6287560',
  '-122.3157263, 47.6318587',
  '-122.3101205, 47.6323639',
  '-122.3073538, 47.6323856',
  '-122.3054963, 47.6351799',
  '-122.3059040, 47.6365029',
  '-122.3048258, 47.6375512',
  '-122.3044449, 47.6379235',
  '-122.3021275, 47.6395265',
  '-122.2968744, 47.6395130',
  '-122.2947004, 47.6397976',
  '-122.2921121, 47.6420331',
  '-122.2903512, 47.6468337',
  '-122.3009956, 47.6468544',
  '-122.3044315, 47.6470622',
  '-122.3039326, 47.6495161'
].map(latlang => ({
  longitude: parseFloat(latlang.split(', ')[0]),
  latitude: parseFloat(latlang.split(', ')[1])
}))

const INITIAL_TRACK_DATA = [
  {
    id: 0,
    name: 'Green Lake Loop',
    latitude: 47.681471,
    longitude: -122.328945,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5,
    checkPoints: GREEN_LAKE
  },
  {
    id: 1,
    name: 'Ballard - Downtown Thru',
    latitude: 47.667729,
    longitude: -122.384861,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 12,
    checkPoints: GREEN_LAKE
  },
  {
    id: 2,
    name: 'All The Parks Thru',
    latitude: 47.617981,
    longitude: -122.319498,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 10,
    checkPoints: ALL_THE_PARKS
  },
  {
    id: 3,
    name: 'Troll Thru',
    latitude: 47.651410,
    longitude: -122.351054,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 6,
    checkPoints: GREEN_LAKE
  },
  {
    id: 4,
    name: 'Montlake Brige Loop',
    latitude: 47.647282,
    longitude: -122.304621,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5,
    checkPoints: GREEN_LAKE
  },
  {
    id: 5,
    name: 'Eastlake Stairs Loop',
    latitude: 47.634961,
    longitude: -122.322331,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    length: 5,
    checkPoints: GREEN_LAKE
  },
]

INITIAL_ACTIVE_CHECKPOINTS = []
//
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTMxMDA5MzAxfQ.m3QJX6UgDNcaidopvMUPOKZoU5S72wInoVTzYqqOO5I'
// AsyncStorage.setItem('token', token)
// .then()

const activePage = (state = INITIAL_PAGE, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_PAGE: {
      console.log('iopioioio');
      AsyncStorage.getItem('token')
      .then(token => {
        console.log(token)
        return request('/tracks')
        .then(tracks => {
          console.log(tracks.data.data)
        })
      })

      return action.payload
    }
    default: return state
  }
}

const activeScrollItem = (state = INITIAL_SCROLL_ITEM, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_SCROLL_ITEM: return action.payload
    default: return state
  }
}

const trackData = (state = INITIAL_TRACK_DATA, action) => {
  return state
}

const activeCheckpoints = (state = INITIAL_ACTIVE_CHECKPOINTS, action) => {
  switch(action.type){
    case UPDATE_ACTIVE_CHECKPOINTS: return action.payload
    default: return state
  }
}







export default combineReducers({ activePage, activeScrollItem, trackData, activeCheckpoints })
