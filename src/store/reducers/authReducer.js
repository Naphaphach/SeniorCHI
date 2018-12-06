const initState = {
    err: null,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            state = { ...state}
            break;
        case 'SIGNIN_ERROR':
            state = { ...state, err: action.err.message}
            break;
        case 'SIGNOUT_SUCCESS':
            state = initState
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default authReducer