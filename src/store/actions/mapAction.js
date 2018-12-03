export const changeState = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CHANGE_STATE', S })
    }
}