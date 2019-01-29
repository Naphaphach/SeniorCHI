const admin = require('firebase-admin')
const uuidv1 = require('uuid/v1');

exports.handler = (user) => {
    const id = uuidv1();
    const notiRef = admin.firestore().collection('notification').doc(id);
    return admin.firestore().collection('user').doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        return notiRef.set({
            owner: user.uid,
            type: 'welcome',
            content: `welcome ${newUser.displayName}`,
            read: false,
            linked: '/profile',
            date: Date()
        });
    })
}