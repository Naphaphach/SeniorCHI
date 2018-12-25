export const changeImgProfile = (img) => {
    return (dispatch, getState) => {
        console.log(img);
        dispatch({ type: 'CHANGE_IMAGE_PROFILE', img })
    }
}