import {
    ARTICLE_CREATE,
    ARTICLE_ACTION_LOAD,
    ARTICLE_ACTION_PAGE,
    ARTICLE_ACTION_TYPE,
    ARTICLE_DELETED, ARTICLE_EDITED, PUT_LIKE, DELETE_LIKE, SINGLE_PAGE, IS_ERROR
} from "./actions";

const initialState = {
    articlesData: [],
    isLoading: true, // пока не получим статьи (прописать фолс в санке или в апишке)
    currentPage: 1,
    perPage: 5,
    totalCount: 0, // 20
    isCreate: null,
    isDeleted: false,
    fullArticle: [],
    singlePage: [],
    isLike: null,
    isUnlike: null,
    isError: null
}

export const reducerArticle = (state = initialState, action) => {
    const {articlesData} = state;
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
        case ARTICLE_CREATE:
            return {
                ...state,
                isCreate: action.payload
            }
        case ARTICLE_DELETED:
            return {
                ...state,
                isDeleted: action.payload
            }
        case ARTICLE_EDITED:
            return {
                ...state,
                fullArticle: action.payload
            }
        case PUT_LIKE:
            return {
                ...state,
                isLike: action.payload
            }
        case DELETE_LIKE:
            return {
                ...state,
                isUnlike: action.payload
            }
        case SINGLE_PAGE:
            return {
                ...state,
                singlePage: action.payload
            }
        case IS_ERROR:
            return {
                ...state,
                isError: action.payload
            }
        default:
            return state
    }
}