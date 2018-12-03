const initState = {
    valueState: 'Andaman_and_Nicobar_Islands'
}

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_STATE':
            state = { ...state, valueState: action.S }
            break;

        default:
            state = initState
            break;
    }
    return state
}

export default projectReducer