export const changeState = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CHANGE_STATE', S })
    }
}

export const searchMap = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SEARCH_MAP', S })
    }
}