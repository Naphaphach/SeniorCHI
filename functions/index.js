// firebase deploy --only functions
const functions = require('firebase-functions');

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

const profileModule = require('./accounts/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userID}').onWrite(profileModule.handler)

const diaryModule = require('./accounts/diaryActivity')
exports.CreateNotification = functions.firestore.document('user/{userID}/diary/{diaryID}').onCreate(diaryModule.handler)