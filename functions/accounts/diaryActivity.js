const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.handler = (change, context) => {
    return console.log(change, context);
    // return admin.firestore().collection('notification').set({

    // })
}