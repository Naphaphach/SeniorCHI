export const register = (U) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const state = getState()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password,
        ).then((resp) => {
            return firestore.collection('user').doc(resp.user.uid).set({
                displayName: U.Name,
                BOD: U.BOD,
                Photo: state.img.imgPro,
                token: 0,
                created: Date()
            })
        }).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signinwithfb = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then(({ user }) => {
            firestore.collection('user').doc(user.uid).get().then(u => {
                if (!u.exists) {
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
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signin = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.Email,
            credentials.Password
        ).then(() => {
            var user = firebase.auth().currentUser;
            if (!user.emailVerified) {
                user.sendEmailVerification().then(function () {
                    // Email sent.
                }).catch(function (err) {
                    // An error happened.
                    dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
            dispatch({ type: 'SIGNIN_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}

export const signout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const updateNameEmailDOB = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().currentUser.updateEmail(credentials.newEmail).then(function () {
            // Update successful.
            firestore.collection('user').doc(credentials.uid).update({
                displayName: credentials.displayName,
                BOD: credentials.BOD,
            })
            dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}

export const updatePWD = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        var auth = firebase.auth();
        var emailAddress = credentials.newEmail;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function (err) {
            // An error happened.
            dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}

export const updateProImg = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        const state = getState()
        if (state.img.imgPro) {
            firestore.collection('user').doc(state.firebase.auth.uid).update({
                Photo: state.img.imgPro
            }).then(function () {
                // Email sent.
                dispatch({ type: 'UPDATE_PHOTO_SUCCESS' })
            }).catch(function (err) {
                // An error happened.
                dispatch({ type: 'UPDATE_PHOTO_ERROR', err })
            });
        }
    }
}

