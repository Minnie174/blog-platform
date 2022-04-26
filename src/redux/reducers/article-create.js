import {ARTICLE_DELETED, ARTICLE_EDITED, ARTICLE_UPDATED} from "../actions/article-edit";
import {ARTICLE_CREATE} from "../actions/article-create";


const initialState = {
    isCreated: null
}

export const reducerArticleCreate = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_CREATE:
            return {
                ...state,
                isCreated: action.payload,
            }
        default:
            return state
    }
}