export const save = (D) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()
        const user = firebase.auth().currentUser;

        while (D.tag.indexOf("") > -1) {
            D.tag.splice(D.tag.indexOf(""), 1);
        }
        var photoURL = []
        if (D.files.length > 0) {
            D.files.map((file, i) => {
                var metadata = {
                    customMetadata: {
                        orientation: D.metadata[i],
                    }
                };

                var storageRef = firebase.storage().ref(user.uid + "/" + file.name);

                //Upload file
                var task = storageRef.put(file, metadata);

                //Update progress bar
                return task.on('state_changed',
                    function progress(snapshot) {

                    },
                    function error(err) {
                        console.log(err);
                    },
                    function complete() {
                        storageRef.getDownloadURL().then(function (url) {
                            photoURL.push(url);
                            // Add a new document in collection "cities"
                            firestore.collection('user').doc(user.uid)
                                .collection('diary').doc(D.id).set({
                                    title: D.title,
                                    public: D.public,
                                    state: D.state,
                                    note: D.note,
                                    tag: D.tag,
                                    photo: photoURL,
                                    date: Date()
                                })
                        });
                        // Get metadata properties
                        storageRef.getMetadata().then(function(metadata) {
                        // Metadata now contains the metadata for 'images/forest.jpg'
                            console.log(metadata);
                        }).catch(function(error) {
                        // Uh-oh, an error occurred!
                        });
                    }
                );
            })
        } else {
            firestore.collection('user').doc(user.uid)
                .collection('diary').doc(D.id).set({
                    title: D.title,
                    public: D.public,
                    state: D.state,
                    note: D.note,
                    tag: D.tag,
                    photo: null,
                    date: Date()
                })
        }
    }
}