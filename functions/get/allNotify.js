const admin = require('firebase-admin');

exports.handler = (data, context) => {
    // Message text passed from the client.
    const text = data.text;
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    const notiRef = admin.firestore().collection('notification');

    return notiRef.get()
}
