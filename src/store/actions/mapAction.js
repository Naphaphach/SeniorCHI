function compare(a, b) {
    if (a.data.date > b.data.date)
        return -1;
    if (a.data.date < b.data.date)
        return 1;
    return 0;
}

export const changeState = (S) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        
        firestore.collection('diary').get().then(snapshot => {
            const result = []
            // snapshot.docs.map(doc => S === doc.data().state && doc.data().writer === state.firebase.auth.uid && doc.data().public ? result.push({ id: doc.id, data: doc.data() }) : null)
            snapshot.docs.map(doc => doc.data().public && S === doc.data().state ? result.push({ id: doc.id, data: doc.data() }) : null)
            result.sort(compare)
            // console.log(snapshot);
            dispatch({ type: 'CHANGE_STATE', S, result })
        })
    }
}

export const changeMenu = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CHANGE_MENU', S })
    }
}

export const searchMap = (S) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SEARCH_MAP', S })
    }
}