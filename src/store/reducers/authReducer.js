const initState = {
    Name: '',
    Email: '',
    Password: '',
    RePassword: '',
    BOD: '',
    Photo: null,
    registed: false,
    auth: false
}

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            state = initState
            break;
    }
    return state
}
export default authReducer