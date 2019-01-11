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
    
    // Retrieve the current count of name changes
    let count = data.token;
    if (!count) {
      count = 0;
    }

    // Then return a promise of a set operation to update the count
    return change.after.ref.set({
        token: count + 1
    }, {merge: true}); 
})