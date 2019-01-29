function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}


export const initial = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();

        firestore.collection('notification').get().then(snapshot => {
            const result = []
            snapshot.docs.map(doc => doc.data().owner === state.firebase.auth.uid && !doc.data().read ? result.push({ id: doc.id, data: doc.data() }) : null)
            result.sort(compare)
            dispatch({ type: 'NOTI_INITIAL', result })
        })
    }
}

