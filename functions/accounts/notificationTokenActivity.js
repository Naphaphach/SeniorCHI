const admin = require('firebase-admin')
const uuidv1 = require('uuid/v1');

exports.handler = (change, context) => {
    const data = change.after.data();
    const previousData = change.before.data();
    const userID = context.params.userID;
    const id = uuidv1();
    const notiRef = admin.firestore().collection('user').doc(userID).collection('notification').doc(id);

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.token === previousData.token) return null;

    const coin = data.token - previousData.token;

    if (coin >= 0) {
        // Then return a promise of a set operation to update the count
        return notiRef.set({
            content: `you got + ${data.token - previousData.token}`,
            readed: false,
            linked: '/profile',
            date: Date()
        });
    } else {
        return null
    }
}