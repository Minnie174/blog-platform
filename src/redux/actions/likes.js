import ApiService from "../../utilities/api-service/api-service";

export const PUT_LIKE = 'PUT_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';
export const LIKE_STATUS = 'LIKE_STATUS';
export const IS_ERROR = 'IS_ERROR';

export const isLiked = (payload) => ({type: PUT_LIKE, payload});
export const isLikeDelete = (payload) => ({type: DELETE_LIKE, payload});
export const isLikedStatus = (payload) => ({type: LIKE_STATUS, payload}); // пока хз, куда его

export const isErrorLike = (payload) => ({type: IS_ERROR, payload});

const api = new ApiService();

export const likeArticle = (slug) => async (dispatch) => {
    try {
        const response = await api.putLike(slug);
        if (response.ok) {
            dispatch(isLiked(true))
            dispatch(isErrorLike(false))
            dispatch(isLikeDelete(false));
        }
    } catch (e) {
        dispatch(isLiked(false));
        dispatch(isErrorLike(true));
    }
}

export const deleteLike = (slug) => async (dispatch) => {
    try {
        const response = await api.deleteLike(slug);
        if (response.ok) {
            dispatch(isLikeDelete(true));
            dispatch(isErrorLike(false));
            dispatch(isLiked(false));
        }
    } catch (e) {
        dispatch(isLikeDelete(false));
        dispatch(isErrorLike(true));
    }
}


