checkarr = (arr1, arr2) => {
    if (arr1.length === arr2.length) {
        for (let index = 0; index < arr1.length; index++) {
            const element = arr1[index];
            const element2 = arr2[index];
            if (element !== element2) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

exports.handler = (change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();

    const id = uuidv1();
    const notiRef = admin.firestore().collection('notification').doc(id);

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (checkarr(data.report, previousData.report)) return null;

    const uid = data.book[data.book.length - 1]

    const userRef = admin.firestore().collection('user').doc(uid);

    return userRef.get(user => {
        return notiRef.set({
            owner: data.writer,
            type: 'report',
            content: `${user.data().displayName} save your diary, ${data.title} of ${data.date}`,
            read: false,
            linked: '/diary',
            date: Date()
        });
    })
}