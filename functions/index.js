// deploy: firebase deploy --only functions 
// local test: firebase functions:shell 
// run serve: firebase serve --only functions
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// exports.Chi = functions.https.onRequest((request, response) => {
//     response.send("Hello from Chi!");
// });

exports.Chi = functions.https.onCall((request, response) => {
    return 'Hello from Chi!';
});

//update prize
const profileModule = require('./accountsPrize/profileActivity')
exports.UpdateToken = functions.firestore.document('user/{userID}').onUpdate(profileModule.handler)

const diaryModule = require('./accountsPrize/diaryActivity')
exports.UpdateTokenDiaryActivity = functions.firestore.document('diary/{diaryID}').onWrite(diaryModule.handler)

//analyze image
const imageDiaryRotateNResizeModule = require('./imageDiary/imageFixBasic')
exports.rotateUsingExif = functions.storage.object().onArchive(imageDiaryRotateNResizeModule.handler)

const imageDiaryWaterMarkModule = require('./imageDiary/imageAddWaterMark')
exports.addWaterMarkImage = functions.storage.object().onFinalize(imageDiaryWaterMarkModule.handler)

const callVisionModule = require('./imageDiary/analyzeImage')
exports.callCloudVision = functions.storage.object().onFinalize(callVisionModule.handler)

const callTranslateModule = require('./imageDiary/analyzeTheme')
exports.callCloudNaturalLanguage = functions.storage.object().onFinalize(callTranslateModule.handler)

// analyze and call diary
const diaryThemeModule = require('./diary/themeOfTag')
exports.UpdateThemeDiaryActivity = functions.firestore.document('diary/{diaryID}').onWrite(diaryThemeModule.handler)

// notification
const notificationTokenModule = require('./notification/notificationTokenActivity')
exports.notifyToken = functions.firestore.document('user/{userID}').onUpdate(notificationTokenModule.handler)

const notificationNewUser = require('./notification/notificationNewUser')
exports.notifyNewUser = functions.auth.user().onCreate(notificationNewUser.handler)

const notificationRemoveModule = require('./notification/remove')
exports.notificationRemove = functions.firestore.document('noitification/{noitificationID}').onUpdate(notificationRemoveModule.handler)

const notificationLikeModule = require('./notification/like')
exports.notificationRemove = functions.firestore.document('diary/{diaryID}').onUpdate(notificationLikeModule.handler)

const notificationBookModule = require('./notification/book')
exports.notificationRemove = functions.firestore.document('diary/{diaryID}').onUpdate(notificationBookModule.handler)

const notificationReportModule = require('./notification/report')
exports.notificationRemove = functions.firestore.document('diary/{diaryID}').onUpdate(notificationReportModule.handler)
