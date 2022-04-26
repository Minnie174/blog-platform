import ApiService from "../../utilities/api-service/api-service";
export const USER_EDITED = 'EDIT_USER';
export const IS_ERROR_PROFILE = 'IS_ERROR_PROFILE';
export const SET_IMAGE = 'SET_IMAGE';


export const isEditedUser = (payload) => ({type: USER_EDITED, payload});
export const isErrorUser = (payload) => ({type: IS_ERROR_PROFILE, payload});
export const setImage = (payload) => ({type: SET_IMAGE, payload});

const api = new ApiService();

export const editUser = (data) => async (dispatch) => {
    try {
        const response = await api.editProfile(data);
        const {user} = response
        const {image} = user;
        console.log(user, image)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('image', JSON.stringify(image))
        dispatch(setImage(image))

        dispatch(isErrorUser(false))
        dispatch(isEditedUser(data))
    } catch(e) {
        dispatch(isErrorUser(true)) // уведомление
    }
}