import mapReducer from './mapReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    map: mapReducer
})

export default rootReducer