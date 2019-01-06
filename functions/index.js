const functions = require('firebase-functions');
const diaryImgModule = require('./diary/image')
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

exports.uploadedIMG = functions.storage.object().onFinalize(diaryImgModule.handler);