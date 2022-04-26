import {ADD_USER, IS_ERROR_REGISTRATION} from "../actions/user";


const initialState = {
    userRegistration: {
        email: null,
        token: null,
        username: null
    },
    isError: null
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
        default:
            return state
    }
}