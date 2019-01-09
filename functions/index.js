const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification add', doc))
})

exports.ChiDiary = functions.firebase.document('user/{userid}/diary/{diaryid}').onCreate(doc => {
    const post = doc.data();
    const notification = {
        content: 'increase the coin',
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
})