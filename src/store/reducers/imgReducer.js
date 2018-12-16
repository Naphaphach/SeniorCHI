const initState = {
    imgPro: null
}

const imgReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_IMAGE_PROFILE':
            state = { ...state, imgPro: action.img}
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default imgReducer