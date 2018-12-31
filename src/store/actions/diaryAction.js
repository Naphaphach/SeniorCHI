export const save = (D) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        // const firestore = getFirestore()
        const state = getState();

        console.log(D, state);
        D.files.map(file => {
            var user = firebase.auth().currentUser;
            var storageRef = firebase.storage().ref(user.uid + "/" + file.name);

            //Upload file
            var task = storageRef.put(file);

            //Update progress bar
            return task.on('state_changed',
                function progress(snapshot) {

                },
                function error(err) {
                    console.log(err);
                },
                function complete() {
                    storageRef.getDownloadURL().then(function (url) {
                        console.log(url);
                    });
                }
            );
        })
    }
}