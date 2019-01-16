const admin = require('firebase-admin')

exports.handler = (change, context) => {
    // console.log('userid: ', context.params.userID, ' diaryid: ', context.params.diaryID);
    const userID = context.params.userID;
    const userRef = admin.firestore().collection('user').doc(userID);
    
    const token = userRef.get().then(doc => {
        if (doc.exists) {
            return userRef.set({
                token: doc.data().token + 10
            }, {merge: true})
        } else {
            return userRef.set({
                token: 10
            }, {merge: true})
        }
    })
    return token
}