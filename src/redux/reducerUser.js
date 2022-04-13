import {ADD_USER, IS_ERROR_USER, LOGIN_USER, IS_AUTH} from "./actions";

const initialState = {
    userRegistration: {
        email: null,
        token: null,
    },
    userLogin: {
        email: null,
        token: null,
        username: null,
        bio: null,
        image: null,
    },
    isAuth: false,
    isError: null,
}


const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userRegistration: {
                    email: action.payload.email,
                    token: action.payload.token,
                }
            }
        case IS_ERROR_USER:
            return {
                ...state,
                isError: action.payload
            }
        case IS_AUTH:
            return {
                ...state,
                isAuth: true
            }
        case LOGIN_USER:
            return {
                ...state,
                userLogin: {
                    email: action.payload.email,
                    token: action.payload.token,
                    username: action.payload.username,
                    bio: action.payload.bio,
                    image: action.payload.image,
            }
        }
        default: return state;
    }
}

export default reducerUser;