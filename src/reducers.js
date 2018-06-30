import { combineReducers } from 'redux'

import { CHANGE_ACTIVE_PAGE } from './actions'

const INITIAL_PAGE = 2


const activePage = (state = INITIAL_PAGE, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_PAGE: return action.payload
    default: return state
  }
}


export default combineReducers({ activePage })
