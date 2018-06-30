export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'


export const changeActivePage = pageId => (
  dispatch => {
    dispatch({
      type: CHANGE_ACTIVE_PAGE,
      payload: pageId
    })
  }
)
