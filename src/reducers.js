import { combineReducers } from 'redux'

import { CHANGE_ACTIVE_PAGE, CHANGE_ACTIVE_SCROLL_ITEM } from './actions'

const INITIAL_PAGE = 2
const INITIAL_SCROLL_ITEM = 0


const activePage = (state = INITIAL_PAGE, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_PAGE: return action.payload
    default: return state
  }
}

const activeScrollItem = (state = INITIAL_SCROLL_ITEM, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_SCROLL_ITEM: return action.payload
    default: return state
  }
}


export default combineReducers({ activePage, activeScrollItem })
