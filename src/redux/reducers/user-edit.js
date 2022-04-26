import {IS_ERROR_PROFILE, SET_IMAGE, USER_EDITED} from "../actions/user-edit";

const initialState = {
    isEdited: {
        email: null,
        image: null,
        password: null,
        username: null
    },
    image: `https://api.realworld.io/images/smiley-cyrus.jpeg`,
    isError: null
}

export const reducerEditUser = (state = initialState, action) => {
    switch (action.type) {
        case USER_EDITED:
            return {
                ...state,
                isEdited: {
                    email: action.payload.email,
                    image: action.payload.image,
                    password: action.payload.password,
                    username: action.payload.username
                }
            }
        case IS_ERROR_PROFILE:
            return {
                ...state,
                isError: action.payload
            }
        case SET_IMAGE:
            return {
                ...state,
                image: action.payload // возможно, нужно обернуть в строку
            }
        default:
            return state
    }
}