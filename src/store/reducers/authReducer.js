const initState = {
    Name: '',
    Photo: null,
    err: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            state = { ...state, Name: action.U.Name, Photo: action.U.Photo, err: null}
            break;
        case 'SIGNIN_ERROR':
            state = { ...state, err: action.err.message}
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default authReducer