import mapReducer from './mapReducer'
import authReducer from './authReducer'
import imgReducer from './imgReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    img: imgReducer,
    map: mapReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer