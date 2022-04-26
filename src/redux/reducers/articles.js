import {ARTICLE_ACTION_LOAD, ARTICLE_ACTION_PAGE, ARTICLE_ACTION_TYPE, ARTICLE_ERROR} from "../actions/articles";

const initialState = {
    articlesData: [],
    isLoading: true,
    currentPage: 1,
    perPage: 5,
    totalCount: 0, // 20
    isErrorArticle: null
}

export const reducerArticle = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_ACTION_TYPE:
            return {
                ...state,
                articlesData: action.payload.articles,
                totalCount: action.payload.articlesCount
            }
        case ARTICLE_ACTION_LOAD:
            return {
                ...state,
                isLoading: action.payload
            }
        case ARTICLE_ACTION_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case ARTICLE_ERROR:
            return {
                ...state,
                isErrorArticle: action.payload
            }
        default:
            return state
    }
}