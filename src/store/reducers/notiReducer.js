const initState = {
    noti: []
}

const notiReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL':
            state = { ...state, noti: action.noti }
            break;
        default:
            state = initState
            break;
    }
    return state
}
export default notiReducer