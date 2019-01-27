// deploy: firebase deploy --only functions 
// local test: firebase functions:shell 
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

//update prize
const profileModule = require('./accountsPrize/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userID}').onUpdate(profileModule.handler)

const diaryModule = require('./accountsPrize/diaryActivity')
exports.UpdateTokenDiaryActivity = functions.firestore.document('user/{userID}/diary/{diaryID}').onWrite(diaryModule.handler)

const notificationTokenModule = require('./accountsPrize/notificationTokenActivity')
exports.notifyToken = functions.firestore.document('user/{userID}').onWrite(notificationTokenModule.handler)

//analyze image
const imageDiaryRotateNResizeModule = require('./imageDiary/imageFixBasicic')
exports.rotateUsingExif = functions.storage.object().onArchive(imageDiaryRotateNResizeModule.handler)

const imageDiaryWaterMarkModule = require('./imageDiary/imageAddWaterMark')
exports.addWaterMarkImage = functions.storage.object().onFinalize(imageDiaryWaterMarkModule.handler)

const callVisionModule = require('./imageDiary/analyzeImage')
exports.callCloudVision = functions.storage.object().onFinalize(callVisionModule.handler)

const callTranslateModule = require('./imageDiary/analyzeTheme')
exports.callCloudNaturalLanguage = functions.storage.object().onFinalize(callTranslateModule.handler)

//analyze and call diary
const diaryThemeModule = require('./accountsPrize/diaryActivity')
exports.UpdateThemeDiaryActivity = functions.firestore.document('user/{userID}/diary/{diaryID}').onWrite(diaryThemeModule.handler)