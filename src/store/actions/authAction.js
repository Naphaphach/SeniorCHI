export const register = (U) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password,
        ).then((resp) => {
            const uploadTask = firebase.storage().ref(`profile/${U.Photo.name}`).put(U.Photo);
            uploadTask.on('state_changed',
            (snapshot) => {

            },
            (error) => {
                return firestore.collection('user').doc(resp.user.uid).set({
                    displayName: U.Name,
                    BOD: U.BOD,
                    Photo: null,
                    token: 0,
                    created: Date()
                })
            },
            () => {
                firebase.storage().ref('profile').child(U.Photo.name).getDownloadURL().then(url => {
                    return firestore.collection('user').doc(resp.user.uid).set({
                        displayName: U.Name,
                        BOD: U.BOD,
                        Photo: url,
                        token: 0,
                        created: Date()
                    })
                })
            })
        }).then(() => {
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signinwithfb = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(({ user }) => {
            firestore.collection('user').doc(user.uid).get().then(u => {
                if (!u.exists){
                    return firestore.collection('user').doc(user.uid).set({
                        displayName: user.displayName,
                        BOD: null,
                        Photo: user.photoURL,
                        token: 0,
                        created: Date()
                    })
                }
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

