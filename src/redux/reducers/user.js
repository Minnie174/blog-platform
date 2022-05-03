import {ADD_USER, IS_ERROR_EMAIL, IS_ERROR_REGISTRATION, IS_ERROR_USERNAME} from "../actions/user";


const initialState = {
    userRegistration: {
        email: null,
        token: null,
        username: null
    },
    isError: null,
    isErrorEmail: null,
    isErrorUsername: null
}

export const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userRegistration: {
                    email: action.payload.email,
                    token: action.payload.token,
                    username: action.payload.username
                }
            }
        case IS_ERROR_REGISTRATION:
            return {
                ...state,
                isError: action.payload
            }
        case IS_ERROR_EMAIL:
            return {
                ...state,
                isErrorEmail: action.payload
            }
        case IS_ERROR_USERNAME:
            return {
                ...state,
                isErrorUsername: action.payload
            }
        default:
            return state
    }
}