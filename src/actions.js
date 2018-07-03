export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'
export const CHANGE_ACTIVE_SCROLL_ITEM = 'CHANGE_ACTIVE_SCROLL_ITEM'


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
