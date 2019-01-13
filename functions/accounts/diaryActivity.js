const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.handler = (change, context) => {
    // console.log('userid: ', context.params.userID, ' diaryid: ', context.params.diaryID);
    const token = admin.firestore().collection('user').doc(context.params.userID).get().then(doc => {
        if (doc.exists) {
            return doc.data().token + 10
        } else {
            return 0
        } 
    })
    return admin.firestore().collection('user').doc(context.params.userID).update({
        token: doc.data().token
    })
}