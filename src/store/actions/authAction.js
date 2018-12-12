export const register = (U) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password,
        ).then((resp) => {
            if(U.Photo !== null){
                const uploadTask = firebase.storage().ref(`profile/${U.Photo.name}`).put(U.Photo);
                uploadTask.on('state_changed',
                (snapshot) => {

                },
                (error) => {
                    resp.user.updateProfile({
                        displayName: U.Name,
                    })
                    resp.user.sendEmailVerification().then(function() {
                        return firestore.collection('user').doc(resp.user.uid).set({
                            displayName: U.Name,
                            BOD: U.BOD,
                            Photo: null,
                            token: 0,
                            created: Date()
                        })
                    }).catch(function(err) {
                      // An error happened.
                      dispatch({ type: 'SIGNUP_ERROR', err })
                    });
                },
                () => {
                    firebase.storage().ref('profile').child(U.Photo.name).getDownloadURL().then(url => {
                        resp.user.updateProfile({
                            displayName: U.Name,
                            photoURL: url
                        })
                        resp.user.sendEmailVerification().then(function() {
                            return firestore.collection('user').doc(resp.user.uid).set({
                                displayName: U.Name,
                                BOD: U.BOD,
                                Photo: url,
                                token: 0,
                                created: Date()
                            })
                        }).catch(function(err) {
                          // An error happened.
                          dispatch({ type: 'VERIFY_ERROR', err })
                        });
                    })
                })
            } else{
                resp.user.updateProfile({
                    displayName: U.Name
                })
                resp.user.sendEmailVerification().then(function() {
                    return firestore.collection('user').doc(resp.user.uid).set({
                        displayName: U.Name,
                        BOD: U.BOD,
                        Photo: null,
                        token: 0,
                        created: Date()
                    })
                }).catch(function(err) {
                  // An error happened.
                  dispatch({ type: 'VERIFY_ERROR', err })
                });
            }
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

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
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
            var user = firebase.auth().currentUser;
            if(!user.emailVerified){
                user.sendEmailVerification().then(function() {
                // Email sent.
                }).catch(function(err) {
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
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.Email,
            credentials.Password
        ).then(() => {
            var user = firebase.auth().currentUser;
            if(!user.emailVerified){
                user.sendEmailVerification().then(function() {
                // Email sent.
                }).catch(function(err) {
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
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const updateNameEmailDOB = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().currentUser.updateEmail(credentials.newEmail).then(function() {
            // Update successful.
            firestore.collection('user').doc(credentials.uid).update({
                displayName: credentials.displayName,
                BOD: credentials.BOD,
            })
            dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function(err) {
            // An error happened.
            dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}

export const updatePWD = (credentials) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        var auth = firebase.auth();
        var emailAddress = credentials.newEmail;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
          dispatch({ type: 'UPDATE_EMAIL_SUCCESS' })
        }).catch(function(err) {
          // An error happened.
          dispatch({ type: 'UPDATE_EMAIL_ERROR', err })
        });
    }
}
