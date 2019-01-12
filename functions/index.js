// firebase deploy --only functions
const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.Chi = functions.https.onRequest((request, response) => {
    response.send("Hello from Chi!");
});

exports.UpdateToken = functions.firestore.document('user/{userId}').onWrite((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.displayName === previousData.displayName && data.DOB === previousData.DOB && data.Photo === previousData.Photo && data.created === previousData.created) return null;
      
    // Retrieve the current count of name changes
    let token = data.token;
    if (!token) {
        token = 0;
    }

    // Then return a promise of a set operation to update the count
    return change.after.ref.set({
        token: token + 1
    }, {merge: true}); 
})