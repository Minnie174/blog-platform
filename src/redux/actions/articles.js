import ApiService from "../../utilities/api-service/api-service";

export const ARTICLE_ACTION_TYPE = 'GET_ARTICLES';
export const ARTICLE_ACTION_LOAD = 'IS_LOADING';
export const ARTICLE_ACTION_PAGE = 'SET_CURRENT_PAGE';
export const ARTICLE_ERROR = 'IF_ERROR'

export const getArticles = (payload) => ({type: ARTICLE_ACTION_TYPE, payload});
export const getLoading = (payload) => ({type: ARTICLE_ACTION_LOAD, payload});
export const setCurrentPage = (payload) => ({type: ARTICLE_ACTION_PAGE, payload});
export const setErrorArticle = (payload) => ({type: ARTICLE_ERROR, payload})

const api = new ApiService();

export const fetchDispatch = (limit, query) => async (dispatch) => { // запрос на статьи
    try {
        const response = await api.getPagination(limit, query, dispatch);
        dispatch(getArticles(response))
        dispatch(setErrorArticle(false))
    } catch (e) {
        dispatch(setErrorArticle(true))
    }
}