import ApiService from "../../utilities/api-service/api-service";

export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_LOAD_ARTICLE = 'GET_LOAD_ARTICLE';
export const IS_GET_ARTICLE = 'IS_GET_ARTICLE';

export const getSingleArticle = (payload) => ({type: GET_ARTICLE, payload});
export const getLoadingArticle = (payload) => ({type: GET_LOAD_ARTICLE, payload});
export const isGetArticle = (payload) => ({type: IS_GET_ARTICLE, payload});

const api = new ApiService();

export const getArticle = (slug) => async (dispatch) => {
    dispatch(getLoadingArticle(true))
    try {
        const response = await api.getArticle(slug)
        dispatch(getSingleArticle(response));
        dispatch(getLoadingArticle(false));
        dispatch(isGetArticle(true));
    } catch (e) {
        dispatch(isGetArticle(false)) // для серверных ошибок
        dispatch(getLoadingArticle(false));
    }
}

export const getOldArticle = (slug) => async (dispatch) => {
    dispatch(getLoadingArticle(true))

    try {
        const response = await api.getArticle(slug)
        dispatch(getSingleArticle(response))
        dispatch(getLoadingArticle(false))
    } catch (e) {
        dispatch(isGetArticle(false))
    }
}