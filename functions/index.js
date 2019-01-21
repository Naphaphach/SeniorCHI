// deploy: firebase deploy --only functions 
// local test: firebase functions:shell 
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

const profileModule = require('./accounts/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userID}').onUpdate(profileModule.handler)

const diaryModule = require('./accounts/diaryActivity')
exports.UpdateTokenDiaryActivity = functions.firestore.document('user/{userID}/diary/{diaryID}').onWrite(diaryModule.handler)

const notificationTokenModule = require('./accounts/notificationTokenActivity')
exports.notifyToken = functions.firestore.document('user/{userID}').onWrite(notificationTokenModule.handler)

const imageDiaryRotateNResizeModule = require('./diary/imageRotate')
exports.rotateUsingExif = functions.storage.object().onFinalize(imageDiaryRotateNResizeModule.handler)

// const imageDiaryResizeModule = require('./diary/imageResize')
// exports.resizeImage = functions.storage.object().onFinalize(imageDiaryResizeModule.handler)

const imageDiaryWaterMarkModule = require('./diary/imageAddWaterMark')
exports.addWaterMarkImage = functions.storage.object().onFinalize(imageDiaryWaterMarkModule.handler)