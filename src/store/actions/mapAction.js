export const changeState = (S) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({ type: 'CHANGE_STATE', S })
    }
}

export const searchMap = (S) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({ type: 'SEARCH_MAP', S })
    }
}