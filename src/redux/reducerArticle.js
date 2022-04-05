import {ARTICLE_ACTION_LENGTH, ARTICLE_ACTION_LOAD, ARTICLE_ACTION_PAGE, ARTICLE_ACTION_TYPE} from "./actions";

const initialState = {
    articlesData: [],
    isLoading: true, // пока не получим статьи (прописать фолс в санке или в апишке)
    currentPage: 1,
    perPage: 5,
    totalCount: 0 // 20
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
        default:
            return state
    }
}