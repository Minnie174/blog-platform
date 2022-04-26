import {GET_ARTICLE, GET_LOAD_ARTICLE, IS_GET_ARTICLE} from "../actions/single-article";


const initialState = {
    fullArticle: [],
    isLoading: null,
    isGetArticle: null
}

export const reducerSingleArticle = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                fullArticle: action.payload
            }
        case GET_LOAD_ARTICLE:
            return {
                ...state,
                isLoading: action.payload
            }
        case IS_GET_ARTICLE:
            return {
                ...state,
                isGetArticle: action.payload
            }
        default:
            return state
    }
}