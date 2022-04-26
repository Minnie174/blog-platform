import {DELETE_LIKE, IS_ERROR, LIKE_STATUS, PUT_LIKE} from "../actions/likes";

const initialState = {
    isLike: null,
    isUnlike: null,
    likeStatus: null,
    isError: null
}

export const reducerLikes = (state = initialState, action) => {
    switch (action.type) {
        case PUT_LIKE:
            return {
                ...state,
                isLike: action.payload,
            }
        case DELETE_LIKE:
            return {
                ...state,
                isUnlike: action.payload
            }
        case LIKE_STATUS:
            return {
                ...state,
                likeStatus: action.payload
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