export const register = (U) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            U.Email,
            U.Password
        ).then((resp) => {
            return firestore.collection('user').doc(resp.user.uid).set({
                Name: U.Name,
                BOD: U.Name,
                Photo: U.Photo,
            })
        }).then(() => {
            dispatch({ type: 'SIGNIN_SUCCESS', U })
        }).catch(err => {
            dispatch({ type: 'SIGNIN_ERROR', err })
        })
    }
}