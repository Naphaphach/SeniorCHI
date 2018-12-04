export const register = (U) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        console.log(U);
        dispatch({ type: 'REGISTER_USER', U })
    }
}