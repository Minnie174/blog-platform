import {ARTICLE_ACTION_LOAD, ARTICLE_ACTION_PAGE, ARTICLE_ACTION_TYPE} from "../actions/articles";
import {ARTICLE_DELETED, ARTICLE_EDITED, ARTICLE_UPDATED} from "../actions/article-edit";

const initialState = {
    isEdit: null,
    isDeleted: null,
    fullArticle: []
}

export const reducerArticleEdit = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_EDITED:
            return {
                ...state,
                isEdit: action.payload,
            }
        case ARTICLE_DELETED:
            return {
                ...state,
                isDeleted: action.payload
            }
        case ARTICLE_UPDATED:
            return {
                ...state,
                fullArticle: action.payload
            }
        default:
            return state
    }
}