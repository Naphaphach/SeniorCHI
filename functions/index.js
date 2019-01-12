// firebase deploy --only functions
const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

const profileModule = require('./accounts/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userId}').onWrite(profileModule.handler)

