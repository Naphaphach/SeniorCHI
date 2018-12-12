const initState = {
    errsignup: null,
    errsignin: null,
    errverify: null,
    errprofile: null,
    erremail: null,
    success: false,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            state = { ...state, errsignup: null, errsignin: null, errprofile: null, erremail: null,}
            break;
        case 'SIGNUP_ERROR':
            state = { ...state, errsignup: action.err.message}
            break;
        case 'SIGNIN_ERROR':
            state = { ...state, errsignin: action.err.message}
            break;
        case 'VERIFY_ERROR':
            state = { ...state, errverify: action.err.message}
            break;
        case 'UPDATE_PROFILE_ERROR':
            state = { ...state, errprofile: action.err.message}
            break;
        case 'UPDATE_EMAIL_ERROR':
            state = { ...state, erremail: action.err.message}
            break;
        case 'UPDATE_EMAIL_SUCCESS':
            state = { ...state, success: true}
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