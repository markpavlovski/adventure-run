import { request } from './helpers'
import { AsyncStorage } from 'react-native'


export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'
export const CHANGE_ACTIVE_SCROLL_ITEM = 'CHANGE_ACTIVE_SCROLL_ITEM'
export const UPDATE_ACTIVE_CHECKPOINTS = 'UPDATE_ACTIVE_CHECKPOINTS'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


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
    .catch(error => console.log('rejected: incorrect password'))
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
