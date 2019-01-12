const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.handler = (snap, context) => {
// Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();

      // perform desired operations ...
      return console.log(newValue);
      
}