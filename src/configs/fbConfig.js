import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

var config = {
  apiKey: "AIzaSyBTUnNEmwbU3WQa-dKzhz95MtKIiLkqiWE",
  authDomain: "app-chi.firebaseapp.com",
  databaseURL: "https://app-chi.firebaseio.com",
  projectId: "app-chi",
  storageBucket: "app-chi.appspot.com",
  messagingSenderId: "165755328510"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })


export default firebase;