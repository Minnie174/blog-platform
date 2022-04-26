import {IS_AUTH, IS_ERROR_LOGIN, LOGIN_USER} from "../actions/user-login";


const initialState = {
    loginUser: {
        email: null,
        token: null,
        username: null,
        bio: null,
    },
    isAuth: false,
    isLogin: null,
    image: `https://api.realworld.io/images/smiley-cyrus.jpeg`,
}

export const reducerLogin = (state = initialState, action) => {
    const {image} = state
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('image', JSON.stringify(image))
            return {
                ...state,
                userLogin: {
                    email: action.payload.email,
                    token: action.payload.token,
                    username: action.payload.username,
                    bio: null,
                }
            }
        case IS_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case IS_ERROR_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state
    }
}