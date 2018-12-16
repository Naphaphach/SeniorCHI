export const changeImgProfile = (img) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CHANGE_IMAGE_PROFILE', img })
    }
}