import ApiService from "../utilities/api-service/api-service";
import {useSelector} from "react-redux";

export const ARTICLE_ACTION_TYPE = 'GET_ARTICLES';
export const ARTICLE_ACTION_LOAD = 'IS_LOADING';
export const ARTICLE_ACTION_PAGE = 'SET_CURRENT_PAGE';
export const ARTICLE_ACTION_LENGTH = 'SET_TOTAL_COUNT';

export const getArticles = (payload) => ({type: ARTICLE_ACTION_TYPE, payload});
export const getLoading = (payload) => ({type: ARTICLE_ACTION_LOAD, payload});
export const setCurrentPage = (payload) => ({type: ARTICLE_ACTION_PAGE, payload});

export const fetchDispatch = (limit, query) => async (dispatch) => { // thunk
    const api = new ApiService();

    try {
        const response2 = await api.getPagination(limit, query);
        dispatch(getArticles(response2))
    } catch (e) {
        console.log(e)
    }
}