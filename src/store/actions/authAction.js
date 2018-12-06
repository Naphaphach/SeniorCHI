export const register = (U) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password,
        ).then((resp) => {
            return firestore.collection('user').doc(resp.user.uid).set({
                displayName: U.Name,
                BOD: U.BOD,
                Photo: null,
                token: 0
            })
        }).then(() => {
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signin = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.Email,
            credentials.Password
        ).then(() => {
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

