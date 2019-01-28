export const initial = () => {
    return (dispatch, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        var addMessage = firebase.functions().httpsCallable('addMessage');
        addMessage().then(function (result) {
            console.log(result);
        }).catch(function (error) {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            // ...
            console.log(code, message, details);
        });
    }
}